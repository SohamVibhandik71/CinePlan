import { useState } from 'react'
import CinePlanBranding from '../components/CinePlanBranding'
import LoadingBar from '../components/LoadingBar'
import LoginForm from '../components/LoginForm'

export default function Login() {
  const [loading, setLoading] = useState(false)

  return (
    <main className="relative grid min-h-screen grid-cols-1 overflow-visible bg-[#131313] lg:grid-cols-[minmax(360px,1fr)_minmax(460px,1fr)] lg:overflow-hidden">
      <LoadingBar active={loading} />
      <CinePlanBranding />
      <section className="flex min-h-screen items-start justify-center bg-[#131313] px-5 py-6 sm:px-6 lg:items-center lg:px-[9%] lg:py-14">
        <CinePlanBranding compact />
        <div className="w-full max-w-[430px]">
          <div className="mb-[38px] lg:mb-[42px]">
            <span className="text-[0.68rem] font-bold tracking-[0.2em] text-[#d4af37]">YOUR WATCHLIST AWAITS</span>
            <h2 className="my-3 mt-[15px] font-[Playfair_Display,serif] text-[clamp(2.45rem,11vw,3.3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#e5e2e1] lg:text-[clamp(2.55rem,4vw,3.75rem)]">Welcome back</h2>
            <p className="m-0 text-[0.95rem] text-[#99907c]">Sign in to continue planning what to watch.</p>
          </div>
          <LoginForm onLoadingChange={setLoading} />
        </div>
      </section>
    </main>
  )
}