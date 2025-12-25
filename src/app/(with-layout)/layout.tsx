import '../globals.css'

import { Header, Footer } from '@/components'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

const WithLayout = ({ children }: { children: React.ReactNode }) => {
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

export default WithLayout
