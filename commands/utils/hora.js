export default {
  command: ['hora', 'horario', 'time'],
  category: 'tools',

  run: async (client, m) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '🍓', key: m.key }
      })

      const now = new Date()

      const zonas = [
        { name: '🇨🇴 Medellín', tz: 'America/Bogota' },
        { name: '🇪🇸 Madrid', tz: 'Europe/Madrid' },
        { name: '🇲🇽 CDMX', tz: 'America/Mexico_City' },
        { name: '🇦🇷 Buenos Aires', tz: 'America/Argentina/Buenos_Aires' },
        { name: '🇺🇸 Miami', tz: 'America/New_York' },
        { name: '🇻🇪 Caracas', tz: 'America/Caracas' }
      ]

      let texto = `╭─❀「 ⏰ 𝙃𝙊𝙍𝘼 𝙈𝙐𝙉𝘿𝙄𝘼𝙇 」❀─╮\n\n`

      zonas.forEach(z => {
        const hora = now.toLocaleTimeString('es-ES', {
          timeZone: z.tz,
          hour12: false
        })

        texto += `${z.name} ${hora}\n`
      })

      texto += `\n╰─  𝘚𝘪𝘦𝘮𝘱𝘳𝘦 𝘢 𝘵𝘶 𝘵𝘪𝘦𝘮𝘱𝘰  ─╯`

      await client.sendMessage(m.chat, {
        image: { url: 'https://causas-files.vercel.app/fl/c2b9.jpg' },
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

    } catch (e) {
      console.error(e)

      await client.sendMessage(m.chat, {
        react: { text: '😞', key: m.key }
      })

      client.reply(m.chat, '❌ Error al obtener la hora.', m)
    }
  }
}