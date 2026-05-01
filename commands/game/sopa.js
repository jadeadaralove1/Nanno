let juegos = {}

function generarSopaDeLetras(palabras) {
  const size = 12
  let grid = Array.from({ length: size }, () => Array(size).fill(' '))

  palabras.forEach((p, idx) => {
    if (idx < size) {
      for (let i = 0; i < p.length && i < size; i++) {
        grid[idx][i] = p[i].toUpperCase()
      }
    }
  })

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === ' ') {
        grid[r][c] = letras[Math.floor(Math.random() * letras.length)]
      }
    }
  }

  return grid.map(row => row.join(' ')).join('\n')
}

export default {
  command: ['sopa', 'sopadeletras', 'shadowgame', 'resolver'],
  tags: ['game'],
  help: ['sopa', 'resolver <palabras>'],
  group: true,

  run: async (conn, m, args) => {
    const command = (m.text || '').split(' ')[0].slice(1).toLowerCase()
    const text = args.join(' ')
    const chatId = m.chat
    const jugador = m.pushName || m.sender

    // Canal
    global.settings = global.settings || {}
    settings.id ??= '120363406529946290@newsletter'

    const palabras = [
      "nanno", "asesinato", "yuri", "dinero", "moño", "rojo",
      "fiesta", "amor", "bot", "locos",
      "sombras", "sangre", "felicidad", "miedo"
    ]

    const banner = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: settings.id,
        newsletterName: 'Mi Canal',
        serverMessageId: 1
      },
      externalAdReply: {
        title: '🧩 Sopa de Letras',
        body: 'Encuentra todas las palabras',
        thumbnailUrl: 'https://files.catbox.moe/7w1n8m.jpg',
        sourceUrl: 'https://whatsapp.com/channel/120363406529946290',
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: false
      }
    }

    // INICIAR JUEGO
    if (['sopa', 'sopadeletras', 'shadowgame'].includes(command)) {
      const sopa = generarSopaDeLetras(palabras)

      juegos[chatId] = {
        jugador,
        palabras,
        inicio: Date.now()
      }

      const mensaje = `╭━━━〔 🌑🎄 SOPA DE LETRAS 🎄🌑 〕━━⬮
┃ 👤 Jugador: ${jugador}
┃ ⏳ Tiempo límite: 10 minutos
╰━━━━━━━━━━━━━━━━⬮

╭━━━〔 🔎 PALABRAS 〕━━⬮
┃ ${palabras.join('\n┃ ')}
╰━━━━━━━━━━━━━━━━⬮

╭━━━〔 🧩 TABLERO 〕━━⬮
${sopa}
╰━━━━━━━━━━━━━━━━⬮

╭━━━〔 ✨ INSTRUCCIÓN 〕━━⬮
┃ Usa:
┃ *.resolver palabra1,palabra2*
╰━━━━━━━━━━━━━━━━⬮`

      await conn.sendMessage(
        m.chat,
        {
          text: mensaje,
          contextInfo: banner
        },
        { quoted: m }
      )

      setTimeout(() => {
        if (juegos[chatId]) {
          conn.sendMessage(
            m.chat,
            {
              text: `╭━━〔 ⏰ AVISO 〕━━⬮\n┃ ${jugador}, quedan *5 minutos*.\n╰━━━━━━━━⬮`,
              contextInfo: banner
            },
            { quoted: m }
          )
        }
      }, 5 * 60 * 1000)

      setTimeout(() => {
        if (juegos[chatId]) {
          conn.sendMessage(
            m.chat,
            {
              text: `╭━━〔 ⚠️ ÚLTIMO MINUTO 〕━━⬮\n┃ ${jugador}, queda *1 minuto*.\n╰━━━━━━━━━━⬮`,
              contextInfo: banner
            },
            { quoted: m }
          )
        }
      }, 9 * 60 * 1000)

      setTimeout(() => {
        if (juegos[chatId]) {
          conn.sendMessage(
            m.chat,
            {
              text: `╭━━〔 💀 FIN DEL TIEMPO 〕━━⬮\n┃ ${jugador}, se acabó el tiempo.\n╰━━━━━━━━━━⬮`,
              contextInfo: banner
            },
            { quoted: m }
          )
          delete juegos[chatId]
        }
      }, 10 * 60 * 1000)
    }

    // RESOLVER
    if (command === 'resolver') {
      if (!juegos[chatId]) {
        return conn.sendMessage(
          m.chat,
          {
            text: `╭━━〔 ⚠️ ERROR 〕━━⬮\n┃ No hay una sopa activa.\n╰━━━━━━━━⬮`,
            contextInfo: banner
          },
          { quoted: m }
        )
      }

      if (!text) {
        return conn.sendMessage(
          m.chat,
          {
            text: `╭━━〔 ✍️ USO CORRECTO 〕━━⬮\n┃ *.resolver palabra1,palabra2*\n╰━━━━━━━━━━⬮`,
            contextInfo: banner
          },
          { quoted: m }
        )
      }

      const encontradas = text.split(',').map(p => p.trim().toLowerCase())

      const faltantes = juegos[chatId].palabras.filter(
        p => !encontradas.includes(p)
      )

      if (faltantes.length === 0) {
        await conn.sendMessage(
          m.chat,
          {
            text: `╭━━〔 🎉 VICTORIA 〕━━⬮
┃ 🏆 Felicidades ${jugador}
┃ Resolviste toda la sopa
╰━━━━━━━━━━⬮`,
            contextInfo: banner
          },
          { quoted: m }
        )

        delete juegos[chatId]
      } else {
        await conn.sendMessage(
          m.chat,
          {
            text: `╭━━〔 ❌ FALTAN PALABRAS 〕━━⬮
┃ ${faltantes.join('\n┃ ')}
╰━━━━━━━━━━⬮`,
            contextInfo: banner
          },
          { quoted: m }
        )
      }
    }
  }
}