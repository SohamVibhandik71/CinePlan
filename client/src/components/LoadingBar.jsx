export default function LoadingBar({ active }) {
  return <div className={`fixed left-0 top-0 z-10 h-0.5 bg-[#f2ca50] transition-opacity ${active ? 'w-[70%] animate-[load_1.4s_ease-in-out_infinite] opacity-100' : 'w-0 opacity-0'}`} aria-hidden="true" />
}