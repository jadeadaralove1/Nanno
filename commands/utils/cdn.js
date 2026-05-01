import { downloadContentFromMessage } from '@whiskeysockets/baileys'

export default {
  command: ['cdn'],
  category: 'tools',

  run: async (client, m) => {
    try {
      const msg = m.quoted ? m.quoted : m
      const mime = msg.msg?.mimetype || msg.mimetype || ''

      if (!mime) {
        return client.reply(
          m.chat,
          '𐄹 ۪ ׁ ❌ᩚ̼ 𖹭̫ ▎ Responde a un archivo con *.cdn*',
          m
        )
      }

      if (!/gif|video|image|audio/.test(mime)) {
        return client.reply(
          m.chat,
          '𐄹 ۪ ׁ ❌ᩚ̼ 𖹭̫ ▎ Formato no compatible.',
          m
        )
      }

      await client.reply(
        m.chat,
        '◜࣭࣭࣭࣭࣭᷼⏳̸̷ׁᮬᰰᩫ࣭࣭࣭࣭  Descargando archivo...',
        m
      )

      const type = mime.split('/')[0]
      const stream = await downloadContentFromMessage(msg.msg || msg, type)

      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }

      if (!buffer.length) throw new Error('No se pudo descargar el archivo')

      const extension = mime.split('/')[1] || 'bin'

      await client.reply(
        m.chat,
        '𐄹 ۪ ׁ ⏳ᩚ̼ 𖹭̫ ▎ Subiendo a CDN...',
        m
      )

      const form = new FormData()
      form.append('files', new Blob([buffer], { type: mime }), `archivo.${extension}`)
      form.append('expiresIn', 'never')

      const response = await fetch('https://causas-files.vercel.app/upload', {
        method: 'POST',
        body: form
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Error desconocido')

      const publicUrl = data.files?.[0]?.publicUrl
      if (!publicUrl) throw new Error('No se recibió URL pública')

      await client.reply(
        m.chat,
        `𐄹 ۪ ׁ ✅ᩚ̼ 𖹭̫ ▎ *Subido exitosamente!*\n\n` +
        `░📦ֶؙ :: *Tipo:* ${mime}\n` +
        `> *URL:*\n${publicUrl}`,
        m
      )

    } catch (e) {
      console.error(e)
      client.reply(m.chat, `Error: ${e.message}`, m)
    }
  }
}