import { Film } from 'lucide-react'

function Mark({ compact = false }) {
  return (
    <span className={`inline-flex items-center justify-center border border-[#d4af37] text-[#f2ca50] ${compact ? 'h-[30px] w-[30px]' : 'mb-[22px] h-[42px] w-[42px]'}`} aria-hidden="true">
      <Film size={compact ? 16 : 19} strokeWidth={1.8} />
    </span>
  )
}

export default function CinePlanBranding({ compact = false }) {
  if (compact) {
    return (
      <header className="flex items-center gap-3 pb-10 lg:hidden">
        <Mark compact />
        <span className="font-[Playfair_Display,serif] text-2xl font-bold leading-none text-[#e5e2e1]">CinePlan</span>
      </header>
    )
  }

  return (
    <section className="relative hidden place-items-center border border-[#2a2a2a] bg-[#1c1b1b] transition-colors duration-300 hover:border-[#4d4635] lg:grid" aria-label="CinePlan introduction">
      <div className="w-[76%] max-w-[360px] text-center">
        <Mark />
        <h1 className="m-0 font-[Playfair_Display,serif] text-[clamp(3.4rem,5vw,5.2rem)] font-bold leading-none tracking-[-0.03em] text-[#e5e2e1]">CinePlan</h1>
        <p className="mx-auto mt-6 max-w-[285px] text-[0.96rem] leading-[1.7] text-[#c8c6c5]">Decide what to watch. Plan when to watch it. Never lose track.</p>
        <span className="mx-auto mt-[35px] block h-px w-11 bg-[#d4af37]" aria-hidden="true" />
      </div>
      <span className="absolute bottom-[26px] right-[30px] text-[0.68rem] tracking-[0.16em] text-[#99907c]" aria-hidden="true">01 / 02</span>
    </section>
  )
}