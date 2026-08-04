/**
 * API client — chatbot.
 * POST /api/chat      → kirim pesan, dapat balasan bot + suggestions
 * POST /api/chat/lead → simpan lead (nama + WA) + notif admin via Fonnte
 */
export interface ChatResult {
  reply: string
  suggestions?: string[]
  intent?: string
  leadPrompt?: boolean
}

export interface ChatLeadResult {
  success: boolean
  id?: number
  reply?: string
  error?: string
}

/** Kirim pesan ke bot. Lempar error jika gagal. */
export async function sendChatMessage(
  message: string,
  history: { role: 'bot' | 'user'; text: string }[],
): Promise<ChatResult> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
  const data = (await res.json().catch(() => null)) as ChatResult | { error: string } | null
  if (!res.ok) {
    throw new Error((data as { error?: string })?.error ?? `Gagal (${res.status})`)
  }
  return (data as ChatResult) ?? { reply: '' }
}

/** Simpan lead (nama + WA) dari percakapan. Lempar error jika gagal. */
export async function submitChatLead(
  nama: string,
  whatsapp: string,
  pesan?: string,
): Promise<ChatLeadResult> {
  const res = await fetch('/api/chat/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama, whatsapp, pesan }),
  })
  const data = (await res.json().catch(() => null)) as ChatLeadResult | null
  if (!res.ok) {
    throw new Error(data?.error ?? `Gagal simpan (${res.status})`)
  }
  return data ?? { success: true }
}
