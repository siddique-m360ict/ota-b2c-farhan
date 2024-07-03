import Image from "next/image"
import Link from "next/link"
import { Icons } from "../icons"

const FirstFooter = () => {
  const footer1 = {
    Explore: [
      { id: 1, text: "About Us", href: "#" },
      { id: 2, text: "Terms & Conditions", href: "/terms" },
      { id: 3, text: "FAQ", href: "/" },
      {
        id: 5,
        text: "Medical Tourism",
        href: "#",
      },
    ],
    Services: [
      { id: 1, text: "Flight", href: "/?search=Flights" },
      { id: 2, text: "Hotel", href: "/?search=Hotel" },
      { id: 3, text: "Holiday", href: "/?search=Holiday" },
      { id: 4, text: "Visa", href: "/?search=Visa" },
    ],
  }
  const commonLinksStyle =
    "text-[#3E4957] transition-colors duration-300 hover:text-primary mb-[7px] block text-[13px] leading-[20px]"

  const socialLinks = [
    { id: 1, icon: <Icons.Facebook />, href: "/" },
    { id: 2, icon: <Icons.MessageCircle />, href: "/" },
    { id: 3, icon: <Icons.Twitter />, href: "/" },
    { id: 4, icon: <Icons.Instagram />, href: "/" },
    { id: 5, icon: <Icons.Youtube />, href: "/" },
    { id: 6, icon: <Icons.Linkedin />, href: "/" },
  ]

  const payImage = [
    "/pay/2.svg",
    "/pay/3.svg",
    "/pay/4.svg",
    "/pay/5.svg",
    "/pay/6.svg",
    "/pay/7.svg",
    "/pay/8.svg",
    "/pay/9.svg",
    "/pay/10.svg",
    "/pay/11.svg",
  ]
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 px-4 md:grid-cols-9 md:px-0">
      <div className="col-span-full md:col-span-2">
        <a href="/" aria-label="Go home" title="Company">
          <Image src={"/be.png"} alt="logo" height={200} width={200} />
        </a>
        <div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-1 text-[#3E4957]">
              <Icons.location className="text-[28px]" />
              <p className="text-xs ">
                House# 74 Road# 7, Block# H, Banani, Dhaka-1213
              </p>
            </div>
            <div className="flex gap-2 text-[#3E4957]">
              <Icons.Mail />
              <p className="text-xs">info@m360ict.com</p>
            </div>
            <div className="flex gap-2 text-[#3E4957]">
              <Icons.Phone className="text-[15px]" />
              <p className="text-xs">
                +8809638336699, +8801888798798 +8802226603136
              </p>
            </div>
            <div className="flex gap-2 text-[#3E4957]">
              <Icons.Globe className="text-[15px]" />
              <p className="text-xs">www.bookingexpert.world</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row-gap-8 grid grid-cols-2 gap-5 md:grid-cols-2 md:px-4 lg:col-span-3">
        {Object.entries(footer1).map(([title, links]) => (
          <div key={title}>
            <p className="font-semibold tracking-wide">{title}</p>
            <ul className="mt-3">
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className={commonLinksStyle}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="md:col-span-2">
        <p className="mb-3 font-semibold tracking-wide">Contact Us</p>

        <div>
          <ul>
            <li>
              <a href="/" className={commonLinksStyle + " mb-[5px] flex "}>
                <span className="me-1 font-semibold text-[#3E4957]">
                  Email:
                </span>
                <p className="text-primary">info@m360ict.com</p>
              </a>
            </li>
            <li>
              <a href="/" className={commonLinksStyle + " mb-[5px] flex "}>
                <span className="me-1 font-semibold text-[#3E4957] ">
                  Phone:
                </span>
                <p className="text-primary">+880-2-41060531</p>
              </a>
            </li>
            <li>
              <a href="/" className={commonLinksStyle + " mb-[5px] flex "}>
                <span className="me-1 font-semibold text-[#3E4957]">
                  WhatsApp:
                </span>
                <p className="text-primary">Message us</p>
              </a>
            </li>
          </ul>
          <div className="mt-3 flex justify-between pe-10 ">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="py-2 pe-2 text-gray-600 hover:text-primary"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-2 ">
        <p className="mb-3 font-semibold tracking-wide">We accept</p>
        <div className="grid grid-cols-5">
          {payImage.map((pay, index) => (
            <div key={index} className="mb-1 h-[28px] w-[48px]">
              <Image src={pay} alt="pay" height={100} width={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FirstFooter
