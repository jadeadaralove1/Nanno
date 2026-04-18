export default {
  command: ['juicio', 'abogado', 'votar'],
  category: 'fun',

  run: async (client, m, args, usedPrefix, command) => {
    try {
      const db = global.db.data
      db.juicios ||= {}
      const chat = db.juicios[m.chat] ||= {}

      const canal = '120363406529946290@newsletter'
      const banner = 'https://causas-files.vercel.app/fl/2be5.jpg'

      const send = (texto) => client.sendMessage(m.chat, {
        text: texto,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: canal,
            newsletterName: 'Nanno-bot',
            serverMessageId: 143
          },
          externalAdReply: {
            title: '⚖️ Juicio activo',
            body: 'Nada es lo que parece',
            thumbnailUrl: banner,
            sourceUrl: 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })

      // 🟢 INICIAR
      if (command === 'juicio') {
        if (chat.activo) return send('⚠️ Ya hay un juicio en curso.')

        chat.activo = true
        chat.jugador = m.sender
        chat.etapa = 0
        chat.puntos = 0
        chat.credibilidad = 5
        chat.tension = 0
        chat.pruebas = ["Mensaje borrado", "Objeto encontrado"]
        chat.votos = {}
        chat.inicioTiempo = Date.now()

        return send(
`⚖️ JUICIO INICIADO

🕵️ Caso: Desaparición sospechosa

> Alguien desapareció...
> Y tú eres la única defensa.

👁 Credibilidad: 5
🔥 Tensión: 0

📜 CAPÍTULO 1: Declaración inicial

✍ Escribe:
${usedPrefix}abogado defender <argumento>

📌 Acciones disponibles:
defender | argumentar | negar | refutar | investigar | mentir | callar`)
      }

      // 🗳️ VOTAR
      if (command === 'votar') {
        if (!chat.activo) return send('💔 No hay juicio activo.')

        const voto = (args[0] || '').toLowerCase()

        if (!['inocente', 'culpable'].includes(voto)) {
          return send('Usa: votar inocente / culpable')
        }

        chat.votos[m.sender] = voto
        return send(`🗳 Voto registrado: ${voto}`)
      }

      // 🔴 VALIDACIONES
      if (!chat.activo) return send('💔 No hay juicio activo.')
      if (m.sender !== chat.jugador) return send('⚖️ Solo el abogado puede jugar.')

      const accion = (args[0] || '').toLowerCase()
      const texto = args.slice(1).join(' ') || ''

      if (!accion) {
        return send(
`✍ Debes usar una acción.

Ejemplo:
${usedPrefix}abogado defender Es inocente porque...

Acciones:
defender | argumentar | negar | refutar | investigar | mentir | callar`)
      }

      // ⏳ TIEMPO
      if (Date.now() - chat.inicioTiempo > 60000) {
        chat.tension++
        chat.inicioTiempo = Date.now()
        await send('⏳ Tardaste demasiado... la tensión aumenta.')
      }

      // 🧠 ANALIZADOR
      const analizar = (txt) => {
        if (!txt) return 0

        let s = 0
        if (txt.length > 15) s++
        if (/porque|ya que|debido/i.test(txt)) s++
        if (/prueba|evidencia|testigo/i.test(txt)) s++
        if (/no|nunca/i.test(txt)) s++

        return s
      }

      let msg = ''
      let bonus = 0

      switch (accion) {

        case 'defender':
          bonus = analizar(texto)
          chat.puntos += bonus
          msg = `🛡 Defensa presentada (+${bonus})`
          break

        case 'argumentar':
          bonus = analizar(texto) + 1
          chat.puntos += bonus
          msg = `📢 Argumento fuerte (+${bonus})`
          break

        case 'negar':
          chat.credibilidad--
          chat.tension++
          msg = '❌ Niega todo… genera sospecha'
          break

        case 'refutar':
          if (chat.pruebas.length) {
            chat.pruebas.shift()
            chat.puntos += 2
            msg = '📉 Eliminaste una prueba'
          } else {
            chat.credibilidad--
            msg = '⚠️ No había pruebas que refutar'
          }
          break

        case 'investigar':
          chat.pruebas.push("Grabación oculta")
          chat.credibilidad++
          msg = '🔍 Nueva evidencia encontrada'
          break

        case 'mentir':
          if (Math.random() < 0.5) {
            chat.puntos += 3
            msg = '😈 Mentira perfecta (+3)'
          } else {
            chat.credibilidad -= 2
            chat.tension += 2
            msg = '💥 Te descubrieron mintiendo'
          }
          break

        case 'callar':
          chat.credibilidad++
          msg = '🤐 Silencio estratégico'
          break

        default:
          return send(
`❌ Acción inválida.

Usa:
defender | argumentar | negar | refutar | investigar | mentir | callar`)
      }

      chat.etapa++
      chat.inicioTiempo = Date.now()

      // 💀 DERROTA
      if (chat.tension >= 5 || chat.credibilidad <= 0) {
        delete db.juicios[m.chat]
        return send(
`💥 EL JUICIO COLAPSÓ

🔒 CULPABLE

> Perdiste el control del caso.`)
      }

      // 🏁 FINAL
      if (chat.etapa >= 5) {
        const votos = Object.values(chat.votos)
        const inocente = votos.filter(v => v === 'inocente').length
        const culpable = votos.filter(v => v === 'culpable').length

        let resultado = '⚖️ DUDA'

        if (inocente > culpable && chat.puntos >= 5) resultado = '🔓 INOCENTE'
        else if (culpable > inocente) resultado = '🔒 CULPABLE'

        delete db.juicios[m.chat]

        return send(
`⚖️ VEREDICTO FINAL

${resultado}

🗳 Jurado:
✔️ Inocente: ${inocente}
❌ Culpable: ${culpable}

🧠 Puntos: ${chat.puntos}
👁 Credibilidad: ${chat.credibilidad}

> La verdad… nunca fue clara.`)
      }

      // 🔄 CONTINUAR (SIEMPRE MUESTRA OPCIONES)
      return send(
`📜 CAPÍTULO ${chat.etapa + 1}

💬 ${msg}

🧠 ${chat.puntos} | 👁 ${chat.credibilidad} | 🔥 ${chat.tension}

📎 Pruebas:
- ${chat.pruebas.join('\n- ') || 'Ninguna'}

👥 Jurado:
${usedPrefix}votar inocente
${usedPrefix}votar culpable

✍ Acciones:
defender <texto>
argumentar <texto>
negar <texto>
refutar
investigar
mentir
callar`)

    } catch (e) {
      console.error(e)
      m.reply('❌ Error en el juicio.')
    }
  }
}