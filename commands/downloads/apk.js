import { search, download } from 'aptoide-scraper'
import { getBuffer } from "../../lib/message.js"

export default {
  command: ['apk', 'aptoide', 'apkdl'],
  category: 'download',
  run: async (client, m, args, usedPrefix, command) => {
    if (!args || !args.length) {
      return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Todo comienza con un nombre…
> escribe el de la aplicación.`)
    }
    const query = args.join(' ').trim()
    try {
      const searchA = await search(query)
      if (!searchA || searchA.length === 0) {
        return m.reply('《✧》 No se encontraron resultados.')
      }
      const apkInfo = await download(searchA[0].id)
      if (!apkInfo) {
        return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Búsqueda fallida…
> no se encontró nada.`)
      }
      const { name, package: id, size, icon, dllink: downloadUrl, lastup } = apkInfo
      const caption = 
`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ Aptoide

• ${name}
• ${id}
• ${lastup}
• ${size}`;
      const sizeBytes = parseSize(size)
      if (sizeBytes > 524288000) {
        return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎A veces es demasiado… (${size}).\n> y tienes que buscarlo por tu cuenta.:\n${downloadUrl}`)
      }
      await client.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'application/vnd.android.package-archive', fileName: `${name}.apk`, caption }, { quoted: m })
     } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
}

function parseSize(sizeStr) {
  if (!sizeStr) return 0
  const parts = sizeStr.trim().toUpperCase().split(' ')
  const value = parseFloat(parts[0])
  const unit = parts[1] || 'B'
  switch (unit) {
    case 'KB': return value * 1024
    case 'MB': return value * 1024 * 1024
    case 'GB': return value * 1024 * 1024 * 1024
    default: return value
  }
}