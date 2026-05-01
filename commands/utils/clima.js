import fetch from 'node-fetch'

export default {
  command: ['clima', 'weather'],
  category: 'tools',

  run: async (client, m, args) => {
    try {
      let ciudad = args.join(' ').trim()

      if (!ciudad) {
        await client.sendMessage(m.chat, {
          react: { text: '🌸', key: m.key }
        })

        return client.reply(
          m.chat,
          '💗 Escribe una ciudad.\nEjemplo: *!clima Tucumán*',
          m
        )
      }

      await client.sendMessage(m.chat, {
        react: { text: '🍓', key: m.key }
      })

      const url = `https://wttr.in/${encodeURIComponent(ciudad)}?lang=es&format=%C+%t\n💨 Viento:+%w\n💧 Humedad:+%h\n📊 Presión:+%P`

      const res = await fetch(url)
      const data = await res.text()

      const texto = 
`╭─❀「 🌤️ 𝘾𝙇𝙄𝙈𝘼 」❀─╮

│ ✧ Ciudad: ${ciudad.toUpperCase()}
│
${data.split('\n').map(line => `│ ${line}`).join('\n')}
│
╰─      𝗡𝗔𝗡𝗡𝗢     ─╯`

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
        react: { text: '💗', key: m.key }
      })

    } catch (e) {
      console.error(e)

      await client.sendMessage(m.chat, {
        react: { text: '😞', key: m.key }
      })

      client.reply(
        m.chat,
        'No pude obtener el clima.\nPrueba con otra ciudad.',
        m
      )
    }
  }
}