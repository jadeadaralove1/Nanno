export default {
  command: ['setgpbanner'],
  category: 'grupo',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/image/.test(mime))
      return m.reply('𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Sin imagen… no hay identidad completa.')
    const img = await q.download()
    if (!img) return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Qué mal…
No se pudo descargar la imagen…

> A veces… las cosas no llegan como esperas.
> ¿Fue un error…
> o simplemente no debía suceder?`)
    try {
      await client.updateProfilePicture(m.chat, img)
      m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Cambio aplicado…
nueva imagen establecida.

> Ahora sí…
> la apariencia está completa.`)
    } catch (e) {
      return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};