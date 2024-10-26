export default function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container h-[calc(100vh-125px)] flex items-center max-w-4xl">
      {children}
    </div>
  )
}
