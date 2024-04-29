interface SettingLayoutProps {
  children: React.ReactNode
}

export default function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <>
      <div className="">{children}</div>
    </>
  )
}
