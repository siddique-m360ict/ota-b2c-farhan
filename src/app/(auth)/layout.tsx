interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <span className=" absolute bottom-0 -ml-20 mt-40 block h-72 w-72 rounded-full bg-[#04868b] opacity-10 mix-blend-multiply blur-3xl filter md:bottom-10 lg:h-96 lg:w-96"></span>
      <span className=" absolute right-0 top-0 block h-72 w-72 rounded-full bg-[#ef233bb2] opacity-10 mix-blend-multiply blur-3xl filter backdrop-blur-[100px] lg:h-96 lg:w-96"></span>
      <div className="z-50">{children}</div>
    </div>
  )
}
