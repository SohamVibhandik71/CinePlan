import { useState } from 'react'

function GoogleMark() {
  return <span className="google-mark" aria-hidden="true">G</span>
}

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false)

  function handleGoogleSignIn() {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1100)
  }

  return (
    <button type="button" className="flex min-h-[53px] w-full items-center justify-center gap-3 rounded-none border border-[#4d4635] bg-transparent text-[0.7rem] font-bold tracking-[0.18em] text-[#c8c6c5] transition-colors hover:border-[#d4af37] hover:text-[#f2ca50] focus-visible:border-[#d4af37] focus-visible:outline-0 disabled:cursor-wait disabled:opacity-70" onClick={handleGoogleSignIn} disabled={loading}>
      {loading ? <span className="h-[17px] w-[17px] animate-[spin_700ms_linear_infinite] rounded-full border-2 border-[rgba(242,202,80,0.3)] border-t-[#f2ca50]" aria-label="Signing in" /> : <GoogleMark />}
      <span>{loading ? 'CONNECTING' : 'SIGN IN WITH GOOGLE'}</span>
    </button>
  )
}