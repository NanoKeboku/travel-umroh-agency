/**
 * ChatPanel — percakapan chatbot (dalam website, bukan WA)
 * - Greeting + quick-reply chips saat pertama dibuka
 * - Kirim pesan → POST /api/chat → balasan bot + suggestions
 * - Lead capture: saat bot minta data (leadPrompt), user ketik nama+WA
 *   → POST /api/chat/lead → notif admin via Fonnte
 * - History in-memory (fase 2: simpan ke D1 + lanjut sesi)
 */
import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import { sendChatMessage, submitChatLead } from '../../api/chatApi'

interface Pesan {
  role: 'bot' | 'user'
  text: string
}

const CHIP_AWAL = ['Harga Paket', 'Jadwal Berangkat', 'Syarat & Visa', 'Kontak Admin']

const GREETING =
  'Assalamualaikum! 👋 Admin Ebitour di sini. Ada yang bisa saya bantu? Silakan pilih di bawah atau ketik pertanyaan Anda.'

/** Ambil nomor WA dari teks ('Budi 081234567890' → '081234567890') */
function ekstrakWa(text: string): string | null {
  const m = text.match(/(\+?62|0)[0-9]{8,13}/)
  return m ? m[0] : null
}

function ChatPanel() {
  const [messages, setMessages] = useState<Pesan[]>([
    { role: 'bot', text: GREETING },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(CHIP_AWAL)
  const [leadMode, setLeadMode] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function kirim(teks: string) {
    const text = teks.trim()
    if (!text || typing) return

    // Mode lead: user diminta nama + WA
    if (leadMode) {
      const wa = ekstrakWa(text)
      if (!wa) {
        setMessages((m) => [
          ...m,
          { role: 'user', text },
          {
            role: 'bot',
            text: 'Maaf, saya belum menemukan nomor WhatsApp-nya. 🙏 Bisa ketik ulang dengan format: Nama + nomor WA (contoh: Budi Santoso 081234567890)',
          },
        ])
        setInput('')
        return
      }
      const nama = text.replace(wa, '').replace(/[^a-zA-Z\s]/g, '').trim() || 'Via Chat'
      setMessages((m) => [...m, { role: 'user', text }])
      setTyping(true)
      try {
        const res = await submitChatLead(nama, wa, text)
        setMessages((m) => [
          ...m,
          { role: 'bot', text: res.reply ?? 'Terima kasih! Admin akan menghubungi Anda.' },
        ])
        setSuggestions(CHIP_AWAL)
        setLeadMode(false)
      } catch (err) {
        setMessages((m) => [
          ...m,
          {
            role: 'bot',
            text: 'Maaf, data gagal tersimpan. Silakan coba lagi, atau hubungi admin via WhatsApp.',
          },
        ])
      } finally {
        setTyping(false)
      }
      setInput('')
      return
    }

    // Mode normal: tanya bot
    setMessages((m) => [...m, { role: 'user', text }])
    setTyping(true)
    setInput('')
    try {
      const res = await sendChatMessage(text, messages)
      setMessages((m) => [...m, { role: 'bot', text: res.reply || '...' }])
      setSuggestions(res.suggestions ?? CHIP_AWAL)
      if (res.leadPrompt) setLeadMode(true)
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: 'Maaf, sedang gangguan. Silakan coba lagi sebentar, atau hubungi admin via WhatsApp.',
        },
      ])
      setSuggestions(CHIP_AWAL)
    } finally {
      setTyping(false)
    }
  }

  function kirimChip(chip: string) {
    if (chip === 'Buka halaman Pendaftaran') {
      window.location.href = '/pendaftaran'
      return
    }
    if (chip === 'Ya, catat data saya') {
      setMessages((m) => [
        ...m,
        { role: 'user', text: chip },
        {
          role: 'bot',
          text: 'Baik! Silakan ketik nama dan nomor WhatsApp Anda, contoh:\nBudi Santoso 081234567890',
        },
      ])
      setSuggestions([])
      setLeadMode(true)
      return
    }
    kirim(chip)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    kirim(input)
  }

  return (
    <div className="flex h-[520px] max-h-[calc(100vh-8rem)] w-[380px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
      {/* Header */}
      <header className="flex items-center gap-3 bg-brand-950 px-4 py-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100">
          <Icon name="kaaba" className="h-5 w-5 text-brand-600" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Ebitour Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Balasan otomatis · admin siap membantu
          </p>
        </div>
      </header>

      {/* Pesan */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm ${
                m.role === 'user'
                  ? 'rounded-tr-sm bg-brand-600 text-white'
                  : 'rounded-tl-sm border border-gray-100 bg-white text-gray-700'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-gray-100 bg-white px-3 pt-2.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => kirimChip(s)}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={leadMode ? 'Nama + nomor WA Anda…' : 'Tulis pesan…'}
          className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Kirim"
          disabled={!input.trim() || typing}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="arrowRight" className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

export default ChatPanel
