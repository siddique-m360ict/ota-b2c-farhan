import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import React from "react"

const VisaDetails = () => {
  const data = {
    job: {
      name: "Job Holder",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Visiting card",
        "No objection certificate (NOC)",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Employee Id card copy (One photo copy)",
        "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
      ],
    },
    Businessman: {
      name: "Businessman",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Personal or Company bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
        "Renewal trade license copy with notary public (english translated)",
        "Visiting card",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Memorandum for limited company form page XII (One photo copy)",
        "Company letter head pad",
        "Personal or company bank solvency certificate",
      ],
    },
    "Govt Job Holder": {
      name: "Govt Job Holder",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Visiting card",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Employee Id card copy (One photo copy)",
        "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
        "GO (Government order) for official passport",
      ],
    },
    Doctor: {
      name: "Govt Job Holder",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Visiting card",
        "BMDC certificate for doctor (Scan copy)",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
      ],
    },
    "Advocate _ Lawyer": {
      name: "Advocate _ Lawyer",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Visiting card",
        "BAR council certificate (One photo copy)",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
      ],
    },
    Student: {
      name: "Advocate _ Lawyer",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Birth certificate",
        "Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )",
      ],
    },
    Housewife: {
      name: "Housewife",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
      ],
    },
    "Retired person": {
      name: "Retired person",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Retirement document (Retired Person) one photo copy",
        "Marriage certificate copy (if spouse name not mentioned in the passport)",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
      ],
    },
    Unemployed: {
      name: "Retired person",
      data: [
        "07 Months Valid Passport With Old Passport (If have)",
        "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
        "Personal bank solvency certificate",
        "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
        "NID or birth certificate (must) one photo copy",
      ],
    },
  }
  return (
    <div className="my-4">
      <Card className="border-none">
        <CardHeader className="px-6 py-4">
          <h1 className="text-[1.2rem] font-bold">
            Required Documents for Sticker Visa
          </h1>
        </CardHeader>
        <CardContent>
          {Object.keys(data).map((key) => (
            <div key={key} className="mb-6">
              <h1 className="mb-3 text-[1.2rem] font-bold">
                {data[key].name}:
              </h1>
              <ul className="list-none">
                {data[key].data.map((item, index) => (
                  <li key={index} className="my-2 flex items-center gap-2">
                    <Icons.check className="text-[#43a046]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default VisaDetails
