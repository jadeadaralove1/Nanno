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

      let user = mentions[0] || m.sender
      let nombre = ''

      try {
        nombre = await client.getName(user)
      } catch {
        nombre = 'alguien'
      }

      const poemas = [
        `No es ${nombre} quien se pierde,\nes el mundo que no sabe sostenerlo.`,

        `${nombre} camina como si el tiempo dudara antes de tocarlo.`,

        `Si miras bien, ${nombre} no está quieto,\nsolo negocia con la realidad.`,

        `El silencio reconoce a ${nombre}\ny por eso no lo interrumpe.`,

        `${nombre} existe en un lugar donde las cosas todavía no deciden ser reales.`,

        `Cuando ${nombre} aparece,\nla historia cambia de tono.`
      ]

      const raro = Math.floor(Math.random() * 100)

      let extra = ''
      if (raro === 0) {
        extra =
`\n⚠️ VERSO ANÓMALO

${nombre} ha sido detectado fuera del poema.`
      }

      const poema = poemas[Math.floor(Math.random() * poemas.length)]

      const texto =
`╔════════════════╗
      🖋️ POESÍA
╚════════════════╝

@${user.split('@')[0]}

${poema}
${extra}

──────────────
✨ inspirado en: ${nombre}
──────────────`

      await client.sendMessage(m.chat, {
        text: texto,
        mentions: [user]
      })

    } catch (e) {
      console.error(e)
      client.reply(m.chat, '❌ La poesía no salió hoy.', m)
    }
  }
}