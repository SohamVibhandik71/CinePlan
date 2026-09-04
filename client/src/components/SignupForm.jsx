import { useState } from 'react'
import FormInput from './FormInput'
import GoogleSignInButton from './GoogleSignInButton'

export default function SignupForm({ onLoadingChange }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [visibleFields, setVisibleFields] = useState({ password: false, confirmPassword: false })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function updateField(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setLoading(true)
    onLoadingChange(true)
    window.setTimeout(() => {
      setLoading(false)
      onLoadingChange(false)
    }, 1400)
  }

  function toggleVisibility(field) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }))
  }

  return (
    <form className="flex flex-col gap-[22px]" onSubmit={handleSubmit} noValidate>
      <FormInput id="name" label="NAME" type="text" value={form.name} onChange={updateField('name')} placeholder="Enter your name" error={errors.name} />
      <FormInput id="email" label="EMAIL" type="email" value={form.email} onChange={updateField('email')} placeholder="Enter your email" error={errors.email} />
      <FormInput id="password" label="PASSWORD" type={visibleFields.password ? 'text' : 'password'} value={form.password} onChange={updateField('password')} placeholder="Create a password" error={errors.password} onToggleVisibility={() => toggleVisibility('password')} />
      <FormInput id="confirmPassword" label="CONFIRM PASSWORD" type={visibleFields.confirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={updateField('confirmPassword')} placeholder="Repeat your password" error={errors.confirmPassword} onToggleVisibility={() => toggleVisibility('confirmPassword')} />

      <button type="submit" className="mt-[3px] flex min-h-[53px] w-full items-center justify-center rounded-none border border-transparent bg-[#f2ca50] text-[0.7rem] font-bold tracking-[0.18em] text-[#131313] transition-colors hover:bg-[#d4af37] focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-[#f2ca50] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313] disabled:cursor-wait disabled:opacity-70" disabled={loading}>
        {loading ? <span className="h-[17px] w-[17px] animate-[spin_700ms_linear_infinite] rounded-full border-2 border-[rgba(19,19,19,0.3)] border-t-[#131313]" aria-label="Creating account" /> : 'CREATE ACCOUNT'}
      </button>

      <div className="flex items-center gap-[15px] text-[0.65rem] tracking-[0.16em] text-[#6f6b63] before:h-px before:flex-1 before:bg-[#2a2a2a] after:h-px after:flex-1 after:bg-[#2a2a2a]"><span>OR</span></div>
      <GoogleSignInButton />

      <p className="mt-[5px] text-center text-[0.8rem] text-[#6f6b63]">Already have an account? <a className="font-bold text-[#d4af37] transition-colors hover:text-[#f2ca50] hover:underline focus-visible:text-[#f2ca50]" href="/login">Sign in</a></p>
    </form>
  )
}