export default {
  command: ['quien', 'quienes'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      if (!m.isGroup) {
        return client.reply(m.chat, '💔 Este comando solo funciona en grupos.', m)
      }

      const text = args.join(' ').trim()

      if (!text) {
        return client.reply(
          m.chat,
          '✨ Escribe algo.\nEjemplo: *#quien es el más inteligente*',
          m
        )
      }

      await client.sendMessage(m.chat, {
        react: { text: '🎭', key: m.key }
      })

      const jidOf = x => (typeof x === 'string'
        ? x
        : (x?.id || x?.jid || x?.participant || '')).toString()

      const group = await client.groupMetadata(m.chat)

      const members = group.participants
        .map(p => jidOf(p))
        .filter(id => id && id !== jidOf(client.user.id))

      if (members.length === 0) {
        return client.reply(m.chat, '💔 No hay usuarios.', m)
      }

      const elegido = members[Math.floor(Math.random() * members.length)]
      const tag = '@' + elegido.split('@')[0]

      const frases = [
        '💀 No hay duda...',
        '😏 Todos sabemos...',
        '🔥 Confirmadísimo...',
        '👀 Sospechoso...',
        '✨ El destino habló...'
      ]

      const frase = frases[Math.floor(Math.random() * frases.length)]

      const texto =
`╭─❖ 🎭 𝙌𝙐𝙄𝙀𝙉 𝙀𝙎 ❖─╮

❓ ${text}

${frase}
╰➤ ${tag}

╰───────────────╯`

      await client.sendMessage(m.chat, {
        text: texto,
        mentions: [elegido],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: "🎭 QUIÉN ES",
            body: "El destino eligió...",
            thumbnailUrl: "https://causas-files.vercel.app/fl/2be5.jpg",
            sourceUrl: "https://whatsapp.com",
            mediaType: 1,
            renderLargerThumbnail: false
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363406529946290@newsletter',
            newsletterName: 'Nanno-bot',
            serverMessageId: 143
          }
        }
      })

      await client.sendMessage(m.chat, {
        react: { text: '😏', key: m.key }
      })

    } catch (e) {
      console.error(e)

      await client.sendMessage(m.chat, {
        react: { text: '💔', key: m.key }
      })

      client.reply(m.chat, '❌ Error en el comando.', m)
    }
  }
}