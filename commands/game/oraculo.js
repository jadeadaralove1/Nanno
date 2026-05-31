export default {
command: ['oraculo', 'oracle', 'destino'],
category: 'fun',

run: async (client, m, args) => {
try {
await client.sendMessage(m.chat, {
react: { text: '🔮', key: m.key }
})

  const pregunta = args.join(' ').trim()

  if (!pregunta) {
    return client.reply(
      m.chat,

`🔮 EL ORÁCULO TE ESCUCHA...

Debes formular una pregunta para consultar tu destino.

Ejemplos:
• .oraculo aprobaré el examen?
• .oraculo encontraré dinero?
• .oraculo debería dormir?
• .oraculo mi gato planea dominar el mundo?`,
m
)
}

  const comunes = [
    '✨ Las estrellas brillan a tu favor.',
    '🌙 El destino sonríe ante esa posibilidad.',
    '🔮 Los antiguos espíritus aprueban tu camino.',
    '☁️ La respuesta permanece oculta.',
    '🕯️ Las sombras aconsejan prudencia.',
    '💫 Lo que buscas se acerca lentamente.',
    '🌌 El universo guarda silencio.',
    '⚠️ No es el momento adecuado.',
    '👁️ Hay algo que aún no ves.',
    '🔥 Tu futuro cambia con cada decisión.',
    '🌿 La paciencia traerá respuestas.',
    '🌑 Incluso el destino tiene dudas.',
    '🦉 La sabiduría recomienda esperar.',
    '🐈 Un gato ha alterado la línea temporal.',
    '🦆 Un pato intervino en la profecía.'
  ]

  const raras = [

`⚠️ EL ORÁCULO HA DESPERTADO

Tu pregunta fue escuchada.

No la repitas.

La respuesta llegará cuando menos la esperes.`,

`👁️ EL OJO OBSERVA

Has llamado la atención de algo antiguo.

Continúa con cuidado.`,

`🌑 PROFECÍA PROHIBIDA

Hay conocimiento que no debería revelarse.

Esta pregunta está cerca de ese límite.`,

`🕯️ MENSAJE OLVIDADO

Alguien hizo esta misma pregunta hace mucho tiempo.

La respuesta fue la misma.

Y no terminó bien.`,

`⚠️ ERROR EN EL DESTINO

El futuro intentó responder.

Algo respondió primero.`,

`🌌 REGISTRO CÓSMICO

Tu pregunta ha sido archivada.

Caso #${Math.floor(Math.random() * 99999)}

Estado:
Pendiente desde hace siglos.`,

`🔮 LOS ESPÍRITUS DISCUTEN

La mitad dice sí.

La otra mitad dice no.

Ambos creen tener razón.`
]

  const profecias = [
    'Dentro de pocos días ocurrirá algo inesperado.',
    'Encontrarás algo que creías perdido.',
    'Una conversación cambiará tu rumbo.',
    'Recibirás una noticia curiosa.',
    'Alguien pensará en ti pronto.',
    'Tu suerte aumentará por un breve momento.',
    'Un pequeño error evitará un problema mayor.',
    'La respuesta llegará por un camino extraño.',
    'Algo que parecía inútil terminará siendo importante.',
    'Verás una coincidencia difícil de ignorar.'
  ]

  const suerte = Math.floor(Math.random() * 100) + 1
  const especial = Math.floor(Math.random() * 100)

  let respuesta = ''

  if (especial <= 3) {
    respuesta = raras[Math.floor(Math.random() * raras.length)]
  } else {
    const frase =
      comunes[Math.floor(Math.random() * comunes.length)]

    const profecia =
      profecias[Math.floor(Math.random() * profecias.length)]

    respuesta =

`${frase}

📜 Profecía:

${profecia}`
}

  let fortuna = ''

  if (suerte >= 90) fortuna = '🌟 Fortuna legendaria'
  else if (suerte >= 70) fortuna = '✨ Fortuna alta'
  else if (suerte >= 50) fortuna = '🍀 Fortuna favorable'
  else if (suerte >= 30) fortuna = '🌙 Fortuna inestable'
  else fortuna = '⚠️ Fortuna cuestionable'

  const texto =

`╔════════════════╗
🔮 ORÁCULO 🔮
╚════════════════╝

❓ Pregunta:

"${pregunta}"

━━━━━━━━━━━━━━━

${respuesta}

━━━━━━━━━━━━━━━

🎲 Nivel de fortuna:
${suerte}/100

${fortuna}

━━━━━━━━━━━━━━━

📖 Mensaje final:

"El destino cambia cada vez que alguien
decide actuar."

🔮 Consulta finalizada.`

  await client.sendMessage(m.chat, {
    image: {
      url: 'https://files.catbox.moe/2ecg5m.jpg'
    },
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

  client.reply(
    m.chat,
    '❌ El Oráculo intentó responder, pero los espíritus cortaron la conexión.',
    m
  )
}

}
}