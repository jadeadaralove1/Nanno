export default {
  command: ['poesia', 'poema', 'verso'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '🖋️', key: m.key }
      })

      const mentions =
        m.mentionedJid ||
        m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
        []

      let user = mentions[0]

      // si no hay mención → "alguien"
      if (!user) user = null

      const poemas = [
        `no se nota cuando llega,\npero todo cambia cuando ${user ? '@' + user.split('@')[0] : 'alguien'} aparece.`,

        `${user ? '@' + user.split('@')[0] : 'alguien'} no hace ruido,\npero desordena el tiempo igual.`,

        `el mundo finge normalidad\nhasta que ${user ? '@' + user.split('@')[0] : 'alguien'} lo mira.`,

        `hay cosas que solo existen\ncuando ${user ? '@' + user.split('@')[0] : 'alguien'} las piensa.`,

        `${user ? '@' + user.split('@')[0] : 'alguien'} no está perdido,\nes el mapa el que no lo entiende.`
      ]

      const poema = poemas[Math.floor(Math.random() * poemas.length)]

      const texto =
`╔════════════════╗
      🖋️ POESÍA
╚════════════════╝

${poema}

──────────────
✨ generado en el vacío
──────────────`

      await client.sendMessage(m.chat, {
        text: texto,
        mentions: user ? [user] : []
      })

    } catch (e) {
      console.error(e)
      client.reply(m.chat, '❌ La poesía no salió hoy.', m)
    }
  }
}