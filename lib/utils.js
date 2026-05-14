const groupMetadataCache = new Map()
const lidCache = new Map()
const pendingRequests = new Map()

const metadataTTL = 60000 // 1 minuto mínimo realista

function getCachedMetadata(groupChatId) {
  const cached = groupMetadataCache.get(groupChatId)
  if (!cached) return null

  if (Date.now() - cached.timestamp > metadataTTL) {
    groupMetadataCache.delete(groupChatId)
    return null
  }

  return cached.metadata
}

function normalizeToJid(phone) {
  if (!phone) return null
  const base = typeof phone === 'number'
    ? phone.toString()
    : phone.replace(/\D/g, '')

  return base ? `${base}@s.whatsapp.net` : null
}

export async function resolveLidToRealJid(lid, client, groupChatId) {
  const input = lid?.toString().trim()
  if (!input || !groupChatId?.endsWith('@g.us')) return input

  if (input.endsWith('@s.whatsapp.net')) return input

  if (lidCache.has(input)) return lidCache.get(input)

  const lidBase = input.split('@')[0]
  let metadata = getCachedMetadata(groupChatId)

  // 🔥 FIX: evitar múltiples requests simultáneos
  if (!metadata) {
    if (pendingRequests.has(groupChatId)) {
      metadata = await pendingRequests.get(groupChatId)
    } else {
      const request = client.groupMetadata(groupChatId)
        .then((res) => {
          groupMetadataCache.set(groupChatId, {
            metadata: res,
            timestamp: Date.now()
          })
          pendingRequests.delete(groupChatId)
          return res
        })
        .catch(() => null)

      pendingRequests.set(groupChatId, request)
      metadata = await request
    }

    if (!metadata) return lidCache.set(input, input), input
  }

  for (const p of metadata.participants || []) {
    const idBase = p?.id?.split('@')[0]?.trim()
    const phoneRaw = p?.phoneNumber
    const phone = normalizeToJid(phoneRaw)

    if (!idBase || !phone) continue
    if (idBase === lidBase) {
      lidCache.set(input, phone)
      return phone
    }
  }

  lidCache.set(input, input)
  return input
}