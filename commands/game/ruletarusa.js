export default {
  command: ['ruleta', 'rr'],
  category: 'fun',

  run: async (client, m) => {
    try {
      if (!m.isGroup) {
        return client.reply(m.chat, '💔 Este juego es solo para grupos.', m)
      }

      await client.sendMessage(m.chat, {
        react: { text: '🎲', key: m.key }
      })

      const jidOf = x => (typeof x === 'string'
        ? x
        : (x?.id || x?.jid || x?.participant || '')).toString()

      const group = await client.groupMetadata(m.chat)

      const members = group.participants
        .map(p => jidOf(p))
        .filter(id => id && id !== jidOf(client.user.id))

      if (members.length < 1) {
        return client.reply(m.chat, '💔 No hay jugadores disponibles.', m)
      }

      // 🎯 elegir víctima
      const elegido = members[Math.floor(Math.random() * members.length)]
      const tag = '@' + elegido.split('@')[0]

      // 🎲 resultados
      const resultados = [
        { tipo: 'dead', texto: '💀 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐃𝐎' },
        { tipo: 'safe', texto: '😇 𝐒𝐄 𝐒𝐀𝐋𝐕𝐀' },
        { tipo: 'reto', texto: '🔥 𝐂𝐀𝐒𝐓𝐈𝐆𝐎' },
        { tipo: 'luck', texto: '👑 𝐒𝐔𝐄𝐑𝐓𝐄 𝐌𝐀𝐗' }
      ]

      const result = resultados[Math.floor(Math.random() * resultados.length)]

      // 💬 extras
      let extra = ''

      if (result.tipo === 'dead') {
        extra = '✖ El destino fue cruel contigo...'
      } else if (result.tipo === 'safe') {
        extra = '✦ Hoy no era tu día final...'
      } else if (result.tipo === 'reto') {
        const retos = [
          '🎤 Envía un audio cantando',
          '📸 Manda una selfie ahora',
          '😂 Di algo vergonzoso',
          '💬 Confiesa algo oscuro'
        ]
        extra = retos[Math.floor(Math.random() * retos.length)]
      } else if (result.tipo === 'luck') {
        extra = '☘ Has sido bendecido por la suerte'
      }

      const texto =
`╭━〔 💀 𝙍𝙐𝙇𝙀𝙏𝘼 𝙍𝙐𝙎𝘼 〕━╮

   🎯 𝙅𝙪𝙜𝙖𝙙𝙤𝙧
   ➤ ${tag}

   🔫 𝙂𝙞𝙧𝙖𝙣𝙙𝙤...
   ▬▬▬▬▬▬▬▬▬▬▬▬

   💥 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊
   ➤ ${result.texto}

   ✧ ${extra}

╰━〔 El destino ya habló... 〕━╯`

      await client.sendMessage(m.chat, {
        image: { url: 'https://causas-files.vercel.app/fl/ivsn.jpg' },
        caption: texto,
        mentions: [elegido],
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
        react: {
          text:
            result.tipo === 'dead' ? '💀' :
            result.tipo === 'safe' ? '😇' :
            result.tipo === 'reto' ? '🔥' : '👑',
          key: m.key
        }
      })

    } catch (e) {
      console.error(e)

      await client.sendMessage(m.chat, {
        react: { text: '💔', key: m.key }
      })

      client.reply(m.chat, '❌ Error en la ruleta.', m)
    }
  }
}