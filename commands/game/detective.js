export default {
  command: ['detective'],
  category: 'game',

  run: async (client, m, args) => {
    global.detective = global.detective || {}

    const chat = m.chat
    const sub = (args[0] || '').toLowerCase()

    const casos = [
      {
        caso: 'Alguien robó 48 empanadas.',
        culpable: 1,
        sospechosos: ['Pepe', 'Ana', 'Carlos'],
        pistas: [
          'Se encontraron migas cerca de la cocina.',
          'Un testigo vio una mochila sospechosa.',
          'Había olor a empanadas en la escena.'
        ],
        respuestas: [
          'Yo estaba viendo memes.',
          'No sé nada de esas empanadas...',
          'Estuve todo el día en la cocina.'
        ]
      },
      {
        caso: 'Desapareció el administrador.',
        culpable: 2,
        sospechosos: ['Lucía', 'Tomás', 'Mile'],
        pistas: [
          'El celular del admin apareció apagado.',
          'Se escuchó una discusión.',
          'Alguien intentó cambiar la foto del grupo.'
        ],
        respuestas: [
          'Yo estaba durmiendo.',
          'No vi nada raro.',
          'Tengo cosas que explicar...'
        ]
      }
    ]

    // Iniciar juego
    if (!global.detective[chat]) {
      const caso = casos[Math.floor(Math.random() * casos.length)]

      global.detective[chat] = {
        ...caso,
        pistaActual: 0
      }

      return client.reply(
        chat,
`🔎 ═══ NUEVO CASO ═══ 🔎

📜 ${caso.caso}

👥 Sospechosos:

1. ${caso.sospechosos[0]}
2. ${caso.sospechosos[1]}
3. ${caso.sospechosos[2]}

━━━━━━━━━━━━━━

Comandos:

.detective pista
.detective interrogar 1
.detective interrogar 2
.detective interrogar 3
.detective acusar número

━━━━━━━━━━━━━━`,
        m
      )
    }

    const game = global.detective[chat]

    // Pista
    if (sub === 'pista') {
      if (game.pistaActual >= game.pistas.length) {
        return client.reply(chat, '❌ No quedan más pistas.', m)
      }

      const pista = game.pistas[game.pistaActual]
      game.pistaActual++

      return client.reply(
        chat,
        `🔍 PISTA #${game.pistaActual}\n\n${pista}`,
        m
      )
    }

    // Interrogar
    if (sub === 'interrogar') {
      const num = Number(args[1])

      if (!num || num < 1 || num > 3) {
        return client.reply(
          chat,
          '⚠️ Usa: .detective interrogar 1',
          m
        )
      }

      return client.reply(
        chat,
`👤 ${game.sospechosos[num - 1]}

"${game.respuestas[num - 1]}"`,
        m
      )
    }

    // Acusar
    if (sub === 'acusar') {
      const num = Number(args[1])

      if (!num || num < 1 || num > 3) {
        return client.reply(
          chat,
          '⚠️ Usa: .detective acusar número',
          m
        )
      }

      const correcto = num === game.culpable

      if (correcto) {
        const culpable =
          game.sospechosos[game.culpable - 1]

        delete global.detective[chat]

        return client.reply(
          chat,
`🎉 CASO RESUELTO

🔨 Culpable:
${culpable}

🏆 Detective:
@${m.sender.split('@')[0]}

Has resuelto el misterio.`,
          m,
          { mentions: [m.sender] }
        )
      }

      delete global.detective[chat]

      return client.reply(
        chat,
`❌ ACUSACIÓN INCORRECTA

El culpable escapó.

Caso cerrado.`,
        m
      )
    }

    client.reply(
      chat,
      '⚠️ Comando inválido.',
      m
    )
  }
}