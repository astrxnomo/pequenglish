export default function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="h-[calc(100vh-125px)] flex justify-center items-center">
        {children}
    </section>
  )
}
