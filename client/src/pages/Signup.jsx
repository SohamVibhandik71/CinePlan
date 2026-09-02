import { useState } from 'react'
import CinePlanBranding from '../components/CinePlanBranding'
import LoadingBar from '../components/LoadingBar'
import SignupForm from '../components/SignupForm'

export default function Signup() {
  const [loading, setLoading] = useState(false)

  return (
    <main className="relative grid min-h-screen grid-cols-1 overflow-visible bg-[#131313] lg:grid-cols-[minmax(360px,1fr)_minmax(460px,1fr)] lg:overflow-hidden">
      <LoadingBar active={loading} />
      <CinePlanBranding />
      <section className="flex min-h-screen items-start justify-center bg-[#131313] px-5 py-6 sm:px-6 lg:items-center lg:px-[9%] lg:py-14">
        <CinePlanBranding compact />
        <div className="w-full max-w-[430px]">
          <div className="mb-[30px] lg:mb-[34px]">
            <span className="text-[0.68rem] font-bold tracking-[0.2em] text-[#d4af37]">MAKE IT A MOVIE NIGHT</span>
            <h2 className="my-3 mt-[15px] font-[Playfair_Display,serif] text-[clamp(2.45rem,11vw,3.3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#e5e2e1] lg:text-[clamp(2.55rem,4vw,3.75rem)]">Join CinePlan</h2>
            <p className="m-0 text-[0.95rem] text-[#99907c]">Create an account and start planning what to watch.</p>
          </div>
          <SignupForm onLoadingChange={setLoading} />
        </div>
      </section>
    </main>
  )
}