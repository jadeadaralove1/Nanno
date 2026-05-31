export default {
  command: ['dato', 'fact', 'curiosidad'],
  category: 'fun',

  run: async (client, m) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '📌', key: m.key }
      })

      const datos = [
        'Los gatos no entienden cuando los ignorás, pero igual te juzgan.',
        'El cerebro humano puede inventar voces más rápido de lo que puede explicarlas.',
        'Nadie sabe exactamente en qué momento se vuelve tarde.',
        'El silencio también tiene volumen, solo que nadie lo mide.',
        'A veces recordás cosas que nunca pasaron como si fueran normales.',
        'Tu cerebro rellena errores sin pedir permiso.',
        'Pensar demasiado no soluciona nada, pero lo hace más interesante.',
        'La mayoría de decisiones se sienten importantes solo en el momento.',
        'Si mirás algo fijo el tiempo suficiente, deja de parecer real.'
      ]

      const dato = datos[Math.floor(Math.random() * datos.length)]

      const texto =
`╔══════════════╗
     📌 DATO
╚══════════════╝

${dato}

──────────────
💭 completamente inútil pero cierto
──────────────`

      await client.sendMessage(m.chat, {
        text: texto
      })

    } catch (e) {
      console.error(e)
      client.reply(m.chat, '❌ No hay datos hoy.', m)
    }
  }
}