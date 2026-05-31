export default {
  command: ['juicio'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      global.tribunal = global.tribunal || {}
      const chat = m.chat
      const sub = (args[0] || '').toLowerCase()

      const data = global.tribunal[chat]

      // ─────────────────────────────
      // 🧾 INICIAR JUICIO
      // ─────────────────────────────
      if (sub === '' || sub === 'iniciar') {
        const mentions =
          m.mentionedJid ||
          m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
          []

        const acusado = mentions[0]

        if (!acusado) {
          return client.reply(
            chat,
`⚖️ USO:

.juicio @acusado

Subcomandos:
.defensa
.testigo @user texto
.prueba texto
.cerrar`,
            m
          )
        }

        global.tribunal[chat] = {
          acusado,
          abogado: m.sender,
          pruebas: [],
          testigos: [],
          defensa: '',
          delito: [
            'alteración del orden del chat',
            'exceso de comportamiento sospechoso',
            'interferencia narrativa leve',
            'uso excesivo de emojis ilegales',
            'desbalance emocional del grupo'
          ][Math.floor(Math.random() * 5)]
        }

        return client.sendMessage(chat, {
          text:
`╔════════════════════╗
        ⚖️ JUICIO ABIERTO
╚════════════════════╝

👤 Acusado: @${acusado.split('@')[0]}
🧑‍⚖️ Abogado: @${m.sender.split('@')[0]}

📜 Cargo:
${global.tribunal[chat].delito}

━━━━━━━━━━━━━━━━━━━━

SUBCOMANDOS:
• .juicio defensa [texto]
• .juicio testigo @user [texto]
• .juicio prueba [texto]
• .juicio cerrar

━━━━━━━━━━━━━━━━━━━━`,
          mentions: [acusado, m.sender]
        })
      }

      if (!data) {
        return client.reply(chat, '❌ No hay juicio activo.', m)
      }

      // ─────────────────────────────
      // 🧑‍⚖️ DEFENSA
      // ─────────────────────────────
      if (sub === 'defensa') {
        const texto = args.slice(1).join(' ')
        if (!texto) return client.reply(chat, '🧑‍⚖️ Escribe tu defensa.', m)

        data.defensa = texto

        return client.sendMessage(chat, {
          text:
`🧑‍⚖️ DEFENSA REGISTRADA

"${texto}"`
        })
      }

      // ─────────────────────────────
      // 👥 TESTIGO
      // ─────────────────────────────
      if (sub === 'testigo') {
        const mentions =
          m.mentionedJid ||
          m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
          []

        const user = mentions[0]
        const texto = args.slice(2).join(' ')

        if (!user || !texto) {
          return client.reply(chat, '👥 Uso: .juicio testigo @user texto', m)
        }

        data.testigos.push({ user, texto })

        return client.sendMessage(chat, {
          text:
`👥 TESTIGO

@${user.split('@')[0]}:
"${texto}"`,
          mentions: [user]
        })
      }

      // ─────────────────────────────
      // 📂 PRUEBA
      // ─────────────────────────────
      if (sub === 'prueba') {
        const texto = args.slice(1).join(' ')
        if (!texto) return client.reply(chat, '📂 Escribe la prueba.', m)

        data.pruebas.push(texto)

        return client.sendMessage(chat, {
          text:
`📂 PRUEBA AÑADIDA

"${texto}"`
        })
      }

      // ─────────────────────────────
      // ⚖️ CERRAR JUICIO
      // ─────────────────────────────
      if (sub === 'cerrar') {
        const score =
          Math.floor(Math.random() * 40) +
          data.pruebas.length * 10 +
          data.testigos.length * 5

        let veredicto =
          score > 80 ? 'INOCENTE ABSOLUTO' :
          score > 50 ? 'INOCENTE CON DUDAS' :
          score > 25 ? 'CULPABLE PARCIAL' :
          'CULPABLE TOTAL'

        const acusado = data.acusado

        const texto =
`╔════════════════════╗
        ⚖️ VEREDICTO FINAL
╚════════════════════╝

👤 Acusado: @${acusado.split('@')[0]}

📜 Delito:
${data.delito}

🧑‍⚖️ Defensa:
"${data.defensa || 'Sin defensa'}"

👥 Testigos: ${data.testigos.length}
📂 Pruebas: ${data.pruebas.length}

━━━━━━━━━━━━━━━━━━━━

⚖️ RESULTADO:
${veredicto}

━━━━━━━━━━━━━━━━━━━━

📌 Caso cerrado.`

        delete global.tribunal[chat]

        return client.sendMessage(chat, {
          text,
          mentions: [acusado]
        })
      }

    } catch (e) {
      console.error(e)
      client.reply(m.chat, '❌ Error en el tribunal.', m)
    }
  }
}