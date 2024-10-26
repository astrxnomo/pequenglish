export default function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-8 max-w-5xl">
      {children}
    </div>
  )
}
