// @ts-nocheck
"use client"
import {
  IBookingDetails,
  Ticket,
} from "@/app/(dashboard)/dashboard/(booking)/actions"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import "jspdf-autotable"
import Image from "next/image"
import { formatFlightDate, timeSlice } from "@/lib/formatter/dateTimeFormatter"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

type Props = {
  ticketData: Ticket
  pnrCode: string
  totalPassenger: number
}

const DownloadTicketPDFButton = ({
  ticketData,
  pnrCode,
  totalPassenger,
}: Props) => {
  const generatePDF = () => {
    const doc = new jsPDF()
    const currentDate = new Date().toLocaleDateString()

    // Add header
    doc.addImage("/be.png", "PNG", 7, 10, 50, 10)
    doc.setFontSize(18)
    doc.text("Farhan Travels", 160, 15)
    doc.setFontSize(10)
    doc.text("Road# 7, Block# H, Banani, Dhaka-1213", 140, 22)
    doc.text("Phone: +8809638336699", 165, 27)
    doc.text("Email: reservation@farhantravels.world", 142, 32)
    doc.setLineWidth(0.1)
    doc.line(1, 36, doc.internal.pageSize.width - 1, 36)

    // Title and Date
    doc.setFontSize(14)
    doc.text("E-TICKET", 95, 50)
    doc.setFontSize(10)

    // Booking Information
    doc.text(`Booking ID: ${pnrCode}`, 7, 60)
    doc.text(`Total Passenger: ${totalPassenger}`, 7, 66)
    // Traveler Details Table
    if (
      ticketData.ticket_issue_data &&
      ticketData.ticket_issue_data.length > 0
    ) {
      const travelerHeaders = [
        "Name",
        "Type",
        "E-Ticket Number",
        "Reservation Code",
        "Ticket Issue Date",
      ]
      const travelerBody = ticketData.ticket_issue_data.map((issueData) => [
        `${issueData.traveler_reference} ${issueData.traveler_given_name} ${issueData.traveler_surname}`,
        issueData.traveler_type,
        issueData.ticket_number,
        issueData.reservation_code,
        issueData.date_issued,
      ])

      doc.setFontSize(14)
      doc.text("Passenger Information", 7, 80)
      doc.setFontSize(14)
      doc.autoTable({
        head: [travelerHeaders],
        body: travelerBody,
        margin: { top: 85, left: 7, right: 5 },
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 3,
          valign: "middle",
          halign: "center",
        },
        headStyles: {
          fillColor: [235, 245, 255],
          textColor: [55, 65, 81],
          fontStyle: "bold",
        },
      })
    }

    // Travel Segments Table
    if (
      ticketData.ticket_issue_segment_data &&
      ticketData.ticket_issue_segment_data.length > 0
    ) {
      const segmentHeaders = [
        "Airline",
        "Flight",
        "Departs",
        "Date/Time",
        "Arrives",
        "Date/Time",
        "Baggage",
        "Cabin",
      ]
      const segmentBody = ticketData.ticket_issue_segment_data.map(
        (segment) => [
          segment.airline_name,
          `${segment.airline_code} ${segment.flight_number}`,
          `${segment.departure_address} (${segment.fromAirportCode})`,
          `${
            segment.departure_date
              ? formatFlightDate(segment.departure_date)
              : ""
          }, ${timeSlice(segment.departure_time)}`,
          `${segment.arrival_address} (${segment.toAirportCode})`,
          `${formatFlightDate(segment.arrival_date)}, ${timeSlice(
            segment.arrival_time
          )}`,
          segment.bags,
          `${segment.cabin_type}(${segment.cabin_code})`,
        ]
      )

      doc.setFontSize(14)
      doc.text("Flight Details", 7, doc.autoTable.previous.finalY + 15)
      doc.autoTable({
        head: [segmentHeaders],
        body: segmentBody,
        startY: doc.autoTable.previous.finalY + 20,
        margin: { top: 105, left: 7, right: 5 },
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 3,
          valign: "middle",
          halign: "center",
        },
        headStyles: {
          fillColor: [235, 245, 255],
          textColor: [55, 65, 81],
          fontStyle: "bold",
        },
      })
    }

    // Fare Details Table
    const fareHeaders = ["Type", "Base Fare", "Tax", "Total"]
    const fareBody = ticketData.ticket_issue_data.map((issueData) => [
      `${issueData.traveler_type}`,
      `${issueData.currency} ${issueData.sub_total}`,
      `${issueData.currency} ${issueData.taxes}`,
      `${issueData.currency} ${issueData.total}`,
    ])

    doc.text("Fare Details", 7, doc.autoTable.previous.finalY + 15)
    doc.autoTable({
      head: [fareHeaders],
      body: fareBody,
      startY: doc.autoTable.previous.finalY + 20,
      margin: { top: 15, left: 7, right: 5 },
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [235, 245, 255],
        textColor: [55, 65, 81],
        fontStyle: "bold",
      },
    })

    // Footer
    const addFooter = () => {
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(10)
        const footerText =
          i < 1
            ? `Page ${i} of ${pageCount} | Farhan Travels | Contact us: support@farhantravels.world | +8809638336699`
            : `Farhan Travels | Contact us: support@farhantravels.world | +8809638336699`
        const footerTagline =
          "Thank you for trusting Farhan Travels with your travel plans. We hope you have a smooth and happy journey."
        doc.text(
          footerText,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        )
        doc.text(
          footerTagline,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 5,
          { align: "center" }
        )
      }
    }

    addFooter()

    // Save the PDF
    doc.save(`ticket_${ticketData.ticket_issue_data[0].id}_${currentDate}.pdf`)
  }

  return (
    <Button
      onClick={generatePDF}
      className="bg-[#3DC5F5] hover:bg-primary"
      style={{ marginBottom: 16 }}
    >
      Download E-ticket
    </Button>
  )
}

export default DownloadTicketPDFButton
