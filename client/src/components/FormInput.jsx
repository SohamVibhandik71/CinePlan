import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'

const iconMap = { name: UserRound, email: Mail, password: LockKeyhole, confirmPassword: LockKeyhole }

export default function FormInput({ id, label, type, value, onChange, placeholder, error, onToggleVisibility }) {
  const Icon = iconMap[id]
  const inputType = id === 'password' && onToggleVisibility ? type : type

  return (
    <div>
      <label className="mb-2 block text-[0.67rem] font-bold tracking-[0.19em] text-[#c8c6c5]" htmlFor={id}>{label}</label>
      <div className={`flex min-h-[43px] items-center gap-[13px] border-b transition-colors duration-200 focus-within:border-[#f2ca50] ${error ? 'border-[#ffb4ab]' : 'border-[#4d4635]'}`}>
        <Icon className="shrink-0 text-[#99907c] transition-colors duration-200 group-focus-within:text-[#f2ca50]" size={18} strokeWidth={1.7} aria-hidden="true" />
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : id === 'confirmPassword' ? 'new-password' : 'current-password'}
        />
        {onToggleVisibility && (
          <button
            type="button"
            className="inline-flex shrink-0 border-0 bg-transparent px-0 pb-2 pl-2 pt-[5px] text-[#99907c] transition-colors hover:text-[#f2ca50] focus-visible:outline-0 focus-visible:text-[#f2ca50]"
            onClick={onToggleVisibility}
            aria-label={type === 'password' ? 'Show password' : 'Hide password'}
          >
            {type === 'password' ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-[#ffb4ab]" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  )
}