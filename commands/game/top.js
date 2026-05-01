export default {
  command: ['top'],
  tags: ['fun'],
  help: ['top *<texto>*'],
  group: true,

  run: async (conn, m, args) => {
    const text = args.join(' ')
    if (!text) {
      return conn.sendMessage(
        m.chat,
        { text: '🌟 Ejemplo: .top los más divertidos' },
        { quoted: m }
      )
    }

    // Canal
    global.settings = global.settings || {}
    settings.id ??= '120363406529946290@newsletter'

    // Obtener participantes
    let metadata
    try {
      metadata = await conn.groupMetadata(m.chat)
    } catch (e) {
      return conn.sendMessage(
        m.chat,
        { text: '⚠️ No se pudo obtener información del grupo.' },
        { quoted: m }
      )
    }

    const participants = metadata.participants.map(v => v.id)

    // Mezclar usuarios
    const shuffled = [...participants].sort(() => Math.random() - 0.5)
    const topUsers = shuffled.slice(0, Math.min(10, shuffled.length))

    const user = a => '@' + a.split('@')[0]

    const emojis = ['👑','✨','🔥','💎','🌟','🎖️']
    const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)]

    let topMessage = `╭━━━〔 👑 𝗧𝗢𝗣 ${topUsers.length} 👑 〕━━⬮
┃▸ ${text}
╰━━━━━━━━━━━━━━⬮\n`

    topUsers.forEach((id, i) => {
      topMessage += `\n${pickRandom(emojis)} *${i + 1}.* ${user(id)}`
    })

    topMessage += `\n\n╭────────────⬮
│ 🎉 Felicidades a los destacados
╰────────────⬮`

    await conn.sendMessage(
      m.chat,
      {
        text: topMessage,
        mentions: topUsers,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: settings.id,
            newsletterName: 'Mi Canal',
            serverMessageId: 1
          },
          externalAdReply: {
            title: '👑 Ranking del Grupo',
            body: '¿Quién quedó primero hoy?',
            thumbnailUrl: 'https://files.catbox.moe/7w1n8m.jpg',
            sourceUrl: 'https://whatsapp.com/channel/120363406529946290',
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: false
          }
        }
      },
      { quoted: m }
    )
  }
}