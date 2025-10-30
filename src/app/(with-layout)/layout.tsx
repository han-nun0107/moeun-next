import '../globals.css'
import { Header, Footer } from '@/components'

export default function WithLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mt-[90px] flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
