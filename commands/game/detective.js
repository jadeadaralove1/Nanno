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
  sospechosos: ['Pepe', 'Ana', 'Carlos']
},
{
  caso: 'Desapareció el administrador.',
  culpable: 2,
  sospechosos: ['Lucía', 'Tomás', 'Mile']
},
{
  caso: 'Robaron los chocolates del recreo.',
  culpable: 3,
  sospechosos: ['Pedro', 'Luna', 'Sofía']
},
{
  caso: 'Alguien cambió la foto del grupo.',
  culpable: 1,
  sospechosos: ['Martín', 'Camila', 'Nico']
},
{
  caso: 'Se filtró un sticker prohibido.',
  culpable: 2,
  sospechosos: ['Julieta', 'Bruno', 'Emilia']
},
{
  caso: 'Desapareció el WiFi misteriosamente.',
  culpable: 3,
  sospechosos: ['Agustín', 'Valen', 'Thiago']
},
{
  caso: 'Alguien escondió la tarea.',
  culpable: 1,
  sospechosos: ['Dylan', 'Mora', 'Franco']
},
{
  caso: 'Se vació la heladera del grupo.',
  culpable: 2,
  sospechosos: ['Noah', 'Bianca', 'Alan']
},
{
  caso: 'Un gato hackeó el grupo.',
  culpable: 3,
  sospechosos: ['Milo', 'Lola', 'Toby']
},
{
  caso: 'Desapareció el control remoto.',
  culpable: 1,
  sospechosos: ['Kevin', 'Ariana', 'Lucas']
},
{
  caso: 'Alguien borró todos los memes.',
  culpable: 2,
  sospechosos: ['Emma', 'Mateo', 'Renata']
},
{
  caso: 'Robaron la torta de cumpleaños.',
  culpable: 3,
  sospechosos: ['Ian', 'Valentina', 'Facu']
},
{
  caso: 'Alguien liberó a los peces del acuario.',
  culpable: 1,
  sospechosos: ['Sara', 'Tomi', 'Bauti']
},
{
  caso: 'Desaparecieron 100 figuritas.',
  culpable: 2,
  sospechosos: ['Lautaro', 'Abril', 'Joaquín']
},
{
  caso: 'Alguien cambió las respuestas del examen.',
  culpable: 3,
  sospechosos: ['Maia', 'Ciro', 'Delfi']
},
{
  caso: 'Se rompió la máquina de café.',
  culpable: 1,
  sospechosos: ['Axel', 'Mica', 'Benja']
},
{
  caso: 'Desapareció el perro del vecino.',
  culpable: 2,
  sospechosos: ['Tiziano', 'Zoe', 'Santi']
},
{
  caso: 'Alguien robó las papas fritas.',
  culpable: 3,
  sospechosos: ['Luca', 'Pilar', 'Gero']
},
{
  caso: 'Un fantasma apareció en el grupo.',
  culpable: 1,
  sospechosos: ['Nacho', 'Cata', 'Emma']
},
{
  caso: 'Se perdió el trofeo escolar.',
  culpable: 2,
  sospechosos: ['Brisa', 'Thiago', 'Alan']
},
{
  caso: 'Alguien escondió el cargador.',
  culpable: 3,
  sospechosos: ['Lola', 'Franco', 'Tomás']
},
{
  caso: 'Robaron 500 stickers premium.',
  culpable: 1,
  sospechosos: ['Lucas', 'Martina', 'Sofi']
},
{
  caso: 'Se borró el servidor de memes.',
  culpable: 2,
  sospechosos: ['Nico', 'Aitana', 'Facu']
},
{
  caso: 'Desapareció el profesor.',
  culpable: 3,
  sospechosos: ['Valen', 'Bruno', 'Emma']
},
{
  caso: 'Alguien sustituyó el agua por gaseosa.',
  culpable: 1,
  sospechosos: ['Agus', 'Luz', 'Tobi']
},
{
  caso: 'Robaron el micrófono del karaoke.',
  culpable: 2,
  sospechosos: ['Cami', 'Dami', 'Thiago']
},
{
  caso: 'Se encontraron memes secretos.',
  culpable: 3,
  sospechosos: ['Noa', 'Juan', 'Belen']
},
{
  caso: 'Desapareció una pizza familiar.',
  culpable: 1,
  sospechosos: ['Mati', 'Romi', 'Jere']
},
{
  caso: 'Alguien falsificó firmas.',
  culpable: 2,
  sospechosos: ['Emma', 'Lucas', 'Luna']
},
{
  caso: 'Robaron una colección de lápices.',
  culpable: 3,
  sospechosos: ['Bianca', 'Santi', 'Tomi']
},
{
  caso: 'Un alien infiltró el grupo.',
  culpable: 1,
  sospechosos: ['Zoe', 'Thiago', 'Valen']
},
{
  caso: 'Desapareció el teclado principal.',
  culpable: 2,
  sospechosos: ['Pedro', 'Nico', 'Mica']
},
{
  caso: 'Alguien saboteó la impresora.',
  culpable: 3,
  sospechosos: ['Luz', 'Alan', 'Delfi']
},
{
  caso: 'Robaron las hamburguesas.',
  culpable: 1,
  sospechosos: ['Tomi', 'Ian', 'Emma']
},
{
  caso: 'Desapareció la mascota del curso.',
  culpable: 2,
  sospechosos: ['Joaquín', 'Abril', 'Renata']
},
{
  caso: 'Alguien manipuló la votación.',
  culpable: 3,
  sospechosos: ['Lucas', 'Cata', 'Bruno']
},
{
  caso: 'Se filtró un audio secreto.',
  culpable: 1,
  sospechosos: ['Valentina', 'Noah', 'Axel']
},
{
  caso: 'Robaron una caja de alfajores.',
  culpable: 2,
  sospechosos: ['Mora', 'Sofi', 'Tiziano']
},
{
  caso: 'Desaparecieron las llaves.',
  culpable: 3,
  sospechosos: ['Dylan', 'Lola', 'Gero']
},
{
  caso: 'Alguien reemplazó los exámenes.',
  culpable: 1,
  sospechosos: ['Pilar', 'Thiago', 'Emma']
},
{
  caso: 'Robaron el proyector.',
  culpable: 2,
  sospechosos: ['Mateo', 'Luca', 'Valen']
},
{
  caso: 'Desapareció la campana escolar.',
  culpable: 3,
  sospechosos: ['Lucas', 'Julieta', 'Brisa']
},
{
  caso: 'Alguien secuestró los emojis.',
  culpable: 1,
  sospechosos: ['Agus', 'Cami', 'Nico']
},
{
  caso: 'Se perdió la contraseña del grupo.',
  culpable: 2,
  sospechosos: ['Emma', 'Tomás', 'Luna']
},
{
  caso: 'Robaron una montaña de galletitas.',
  culpable: 3,
  sospechosos: ['Ian', 'Valen', 'Axel']
},
{
  caso: 'Desapareció la computadora del laboratorio.',
  culpable: 1,
  sospechosos: ['Facu', 'Noa', 'Bianca']
},
{
  caso: 'Alguien intercambió todos los nombres.',
  culpable: 2,
  sospechosos: ['Bruno', 'Delfi', 'Tomi']
},
{
  caso: 'Robaron la bandera del curso.',
  culpable: 3,
  sospechosos: ['Jere', 'Emma', 'Mati']
},
{
  caso: 'Un ninja apareció en la escuela.',
  culpable: 1,
  sospechosos: ['Lucas', 'Zoe', 'Santi']
},
{
  caso: 'Desaparecieron los apuntes finales.',
  culpable: 2,
  sospechosos: ['Luz', 'Thiago', 'Mora']
},
{
  caso: 'Alguien escondió todas las sillas.',
  culpable: 3,
  sospechosos: ['Alan', 'Renata', 'Lola']
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