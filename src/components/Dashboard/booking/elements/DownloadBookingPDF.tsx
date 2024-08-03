// @ts-nocheck
"use client"
import { IBookingDetails } from "@/app/(dashboard)/dashboard/(booking)/actions"
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
  bookingData: IBookingDetails
}

const DownloadBookingPDF = ({ bookingData }: Props) => {
  const generatePDF = () => {
    const doc = new jsPDF()
    const currentDate = new Date().toLocaleDateString()

    // Add header
    doc.addImage("/be.png", "PNG", 7, 10, 50, 10)
    doc.setFontSize(18)
    doc.text("Booking Expert", 160, 15)
    doc.setFontSize(10)
    doc.text("Road# 7, Block# H, Banani, Dhaka-1213", 140, 22)
    doc.text("Phone: +8809638336699", 165, 27)
    doc.text("Email: reservation@bookingexpert.world", 142, 32)
    doc.setLineWidth(0.1)
    doc.line(1, 36, doc.internal.pageSize.width - 1, 36)

    // Title and Date
    doc.setFontSize(14)
    doc.text("E-BOOK", 95, 50)
    doc.setFontSize(10)

    // Booking Information
    doc.text(
      `Booking Date: ${formatFlightDate(bookingData.booking_created_at)}`,
      7,
      60
    )
    doc.text(`Booking Status: ${bookingData.booking_status}`, 7, 65.4)
    doc.text(`PNR: ${bookingData.pnr_code}`, 7, 71)
    doc.text(`Booking ID: BEI-${bookingData.booking_id}`, 175, 60)
    doc.text(`Booked By: ${bookingData.created_by}`, 175, 65.4)
    doc.text(`Total Passenger: ${bookingData.total_passenger}`, 175, 71)

    // Traveler Details Table
    if (bookingData.traveler && bookingData.traveler.length > 0) {
      const travelerHeaders = ["Name", "Type", "Phone", "Email", "Passport No"]
      const travelerBody = bookingData.traveler.map((traveler) => [
        `${traveler.reference} ${traveler.mid_name} ${traveler.sur_name}`,
        traveler.type,
        traveler.phone,
        traveler.email,
        traveler.passport_number,
      ])

      doc.setFontSize(14)
      doc.text("Passenger Details", 7, 90)
      doc.setFontSize(14)
      doc.autoTable({
        head: [travelerHeaders],
        body: travelerBody,
        margin: { top: 95, left: 7, right: 5 },
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
    if (bookingData.segments && bookingData.segments.length > 0) {
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
      const segmentBody = bookingData.segments.map((segment) => [
        segment.airline,
        segment.flight_number,
        segment.origin,
        `${formatFlightDate(segment.departure_date)}, ${timeSlice(
          segment.departure_time
        )}`,
        segment.destination,
        `${formatFlightDate(segment.arrival_date)}, ${timeSlice(
          segment.arrival_time
        )}`,
        segment.baggage,
        segment.class,
      ])

      doc.setFontSize(14)
      doc.text("Travel Segments", 7, doc.autoTable.previous.finalY + 14)
      doc.setFontSize(14)
      doc.autoTable({
        head: [segmentHeaders],
        body: segmentBody,
        startY: doc.autoTable.previous.finalY + 19,
        margin: { top: 105, left: 7, right: 5 },
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 2,
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
    const fareHeaders = ["Base Fare", "Tax", "AIT", "Discount", "Total Price"]
    const fareBody = [
      [
        `BDT ${bookingData.ticket_price}`,
        `BDT ${bookingData.total_tax}`,
        `BDT ${bookingData.ait}`,
        `BDT ${bookingData.discount}`,
        `BDT ${bookingData.payable_amount}`,
      ],
    ]

    doc.text("Fare Details", 7, doc.autoTable.previous.finalY + 14)
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
            ? `Page ${i} of ${pageCount} | Booking Expert | Contact us: support@bookingexpert.world | +8809638336699`
            : `Booking Expert | Contact us: support@bookingexpert.world | +8809638336699`
        const footerTagline =
          "Thank you for trusting Booking Expert with your travel plans. We hope you have a smooth and happy journey."
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
    doc.save(`Booking_${bookingData.booking_id}_${currentDate}.pdf`)
  }

  return (
    <Button
      onClick={generatePDF}
      className="hover:bg-[#3DC5F5]"
      style={{ marginBottom: 16 }}
    >
      Download E-Book
    </Button>
  )
}

export default DownloadBookingPDF
