export default {
  command: ['poesia', 'poema', 'verso'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '🖋️', key: m.key }
      })

      const nombre = args.join(' ').trim() || m.pushName || 'alguien'

      const poemas = [
        `${nombre} camina sin ruido,\ncomo si el mundo le debiera silencio.`,

        `No es ${nombre} quien se pierde,\nes el día que no sabe dónde ponerlo.`,

        `${nombre} no pregunta,\nsolo observa cómo todo cambia de lugar.`,

        `Si buscas a ${nombre},\nya se volvió parte del viento.`,

        `${nombre} existe en un punto extraño del tiempo,\ndonde las cosas todavía no terminan de decidir qué son.`,

        `A ${nombre} le siguen las sombras,\nno porque lo persigan,\nsino porque no quieren perderse nada.`,

        `${nombre} no llega tarde.\nEs el tiempo el que no sabe esperarlo.`,

        `Cuando ${nombre} habla,\nel mundo baja un poco el volumen.`
      ]

      const raro = Math.floor(Math.random() * 100)

      let extra = ''
      if (raro === 0) {
        extra =
`\n\n⚠️ POEMA NO REGISTRADO

Este verso no debería existir.
Pero ${nombre} lo hizo aparecer.`
      }

      const poema = poemas[Math.floor(Math.random() * poemas.length)]

      const texto =
`╔════════════════╗
      🖋️ POESÍA
╚════════════════╝

${poema}
${extra}

──────────────
✨ generado para: ${nombre}
──────────────`

      await client.sendMessage(m.chat, {
        text: texto
      })

    } catch (e) {
      console.error(e)
      client.reply(m.chat, '❌ La poesía no quiso escribirse hoy.', m)
    }
  }
}