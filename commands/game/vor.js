export default {
  command: ['verdad', 'reto', 'vr'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '🎲', key: m.key }
      })

      const tipo = m.text.toLowerCase().includes('reto') ? 'reto' : 'verdad'

      const verdades = [
        '😳 ¿Quién te gusta en secreto?',
        '📱 ¿Revisas chats ajenos?',
        '🤭 ¿Cuál fue tu momento más vergonzoso?',
        '💔 ¿Alguna vez te rechazaron?',
        '👀 ¿A quién del grupo besarías?'
      ]

      const retos = [
        '🔥 Manda un audio diciendo “soy fan de Nanno”',
        '📸 Envía una selfie ahora mismo',
        '🎤 Canta algo en audio',
        '😂 Escribe sin usar la letra "a"',
        '💬 Confiesa algo random del grupo'
      ]

      const elegido = tipo === 'reto'
        ? retos[Math.floor(Math.random() * retos.length)]
        : verdades[Math.floor(Math.random() * verdades.length)]

      const texto =
`╭━━━🎲━━━╮
   𝙑𝙀𝙍𝘿𝘼𝘿 𝙊 𝙍𝙀𝙏𝙊
╰━━━🎲━━━╯

🎯 Tipo: *${tipo.toUpperCase()}*

${elegido}

╰➤ No te escapes... 😏`

      await client.sendMessage(m.chat, {
        image: { url: 'https://causas-files.vercel.app/fl/ivsn.jpg' },
        caption: texto,
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
        react: { text: tipo === 'reto' ? '🔥' : '😳', key: m.key }
      })

    } catch (e) {
      console.error(e)

      await client.sendMessage(m.chat, {
        react: { text: '💔', key: m.key }
      })

      client.reply(m.chat, '❌ Error en el juego.', m)
    }
  }
}