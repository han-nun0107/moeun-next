import '../globals.css'

import { Header, Footer } from '@/components'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

export default function WithLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ReactQueryProvider>
        <main className="mt-[90px] flex-grow">{children}</main>
      </ReactQueryProvider>
      <Footer />
    </div>
  )
}
