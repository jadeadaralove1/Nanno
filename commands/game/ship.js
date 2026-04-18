export default {
  command: ['ship', 'shipear', 'pareja'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '💞', key: m.key }
      })

      const jidOf = x => (typeof x === 'string'
        ? x
        : (x?.id || x?.jid || x?.participant || '')).toString()

      // 🔍 DETECTAR MENCIONES
      let mentions =
        m.mentionedJid ||
        m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
        []

      // 📌 RESPUESTA
      if ((!mentions || mentions.length === 0) && m.quoted) {
        const q = m.quoted.sender || m.quoted.participant
        if (q) mentions = [jidOf(q)]
      }

      let user1, user2
      let name1 = '', name2 = ''
      const text = args.join(' ').trim()

      // ───── LÓGICA ─────

      if (mentions.length >= 2) {
        user1 = jidOf(mentions[0])
        user2 = jidOf(mentions[1])
      }

      else if (mentions.length === 1) {
        user1 = jidOf(m.sender)
        user2 = jidOf(mentions[0])
      }

      else if (text.includes('+')) {
        const parts = text.split('+').map(t => t.trim()).filter(Boolean)
        if (parts.length >= 2) {
          name1 = parts[0]
          name2 = parts[1]
        }
      }

      else if (text) {
        name1 = m.pushName || 'Tú'
        name2 = text
      }

      else {
        const group = await client.groupMetadata(m.chat)

        const members = group.participants
          .map(p => jidOf(p))
          .filter(id => id && id !== jidOf(m.sender))

        if (members.length < 1) {
          return client.reply(m.chat, '💔 No hay suficientes usuarios.', m)
        }

        user1 = jidOf(m.sender)
        user2 = members[Math.floor(Math.random() * members.length)]
      }

      // 🧠 NOMBRES
      if (!name1 && user1) {
        try { name1 = await client.getName(user1) } catch { name1 = 'Usuario 1' }
      }

      if (!name2 && user2) {
        try { name2 = await client.getName(user2) } catch { name2 = 'Usuario 2' }
      }

      if (!name1) name1 = 'Usuario 1'
      if (!name2) name2 = 'Usuario 2'

      // 🔥 MENCIÓN REAL (CLAVE)
      const tag1 = user1 ? '@' + user1.split('@')[0] : name1
      const tag2 = user2 ? '@' + user2.split('@')[0] : name2

      // 💘 %
      let percent = Math.floor(Math.random() * 101)

      const full = Math.floor(percent / 10)
      const hearts = '💗'.repeat(full) + '🤍'.repeat(10 - full)

      let phrase = ''
      if (percent >= 95) phrase = '💍 Amor eterno 💫'
      else if (percent >= 80) phrase = '🔥 Pareja perfecta 💕'
      else if (percent >= 60) phrase = '💗 Hay química 😏'
      else if (percent >= 40) phrase = '🌸 Puede pasar algo...'
      else phrase = '💔 Mejor como amigos 😭'

      const texto =
`╭━━━💞━━━╮
  𝙎𝙃𝙄𝙋
╰━━━💞━━━╯

💗 ${tag1} × ${tag2}

╭─💘 Compatibilidad
│ ➤ ${percent}%
│ ${hearts}
╰────────────

✨ ${phrase}`

      const mentionsFinal = [user1, user2].filter(Boolean)

      await client.sendMessage(m.chat, {
        image: { url: 'https://causas-files.vercel.app/fl/ivsn.jpg' },
        caption: texto,
        mentions: mentionsFinal,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363406529946290@newsletter',
            newsletterName: 'Nanno-bot',
            serverMessageId: 143
          }
        }
      })

      await client.sendMessage(m.chat, {
        react: { text: percent >= 70 ? '💗' : '💔', key: m.key }
      })

    } catch (e) {
      console.error(e)

      await client.sendMessage(m.chat, {
        react: { text: '💔', key: m.key }
      })

      client.reply(m.chat, '❌ Error en el ship.', m)
    }
  }
}