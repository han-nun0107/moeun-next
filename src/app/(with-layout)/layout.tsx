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
      <main>{children}</main>
      <Footer />
    </>
  )
}
