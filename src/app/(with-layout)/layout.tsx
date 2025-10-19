import '../globals.css'
import { Header, Footer } from '@/components'

export default function WithLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-grow pt-[90px]">{children}</main>
      <Footer />
    </>
  )
}
