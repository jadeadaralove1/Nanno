export default {
  command: ['acertijo', 'riddle'],
  tags: ['fun'],
  help: ['#acertijo', '#respuesta <tu respuesta>'],
  group: true,

  run: async (conn, m, args) => {

    global.acertijoActual = global.acertijoActual || {}

    // RESPONDER
    if (args[0]?.toLowerCase() === "respuesta") {
      const data = global.acertijoActual[m.chat]

      if (!data) {
        return conn.sendMessage(m.chat, { text: "⚠️ No hay acertijo activo." })
      }

      const userRespuesta = args.slice(1).join(" ").toLowerCase().trim()
      const correcta = data.respuesta

      // ✔️ CORRECTO
      if (userRespuesta === correcta) {
        await conn.sendMessage(m.chat, {
          text: "🎉 ¡Correcto! Ganaste 😎"
        })
        delete global.acertijoActual[m.chat]
        return
      }

      // ❌ INCORRECTO
      data.intentos--

      if (data.intentos <= 0) {
        await conn.sendMessage(m.chat, {
          text: `💀 Perdiste...\nLa respuesta era: *${correcta}*`
        })
        delete global.acertijoActual[m.chat]
      } else {
        await conn.sendMessage(m.chat, {
          text: `❌ Incorrecto 😅\nTe quedan *${data.intentos}* intentos`
        })
      }

      return
    }

    // NUEVO ACERTIJO
    const acertijos = [
      { pregunta: "Soy roja y redonda, me usan en ensaladas y postres.", respuesta: "manzana" },
      { pregunta: "Soy amarilla y curvada, perfecta para un snack.", respuesta: "banana" },
      { pregunta: "Soy pequeña, roja y dulce, crezco en el jardín.", respuesta: "fresa" },
      { pregunta: "Soy naranja y me exprimes para jugo.", respuesta: "naranja" },
      { pregunta: "Soy grande, gris y tengo trompa.", respuesta: "elefante" },
      { pregunta: "Hago 'miau', me gusta cazar ratones.", respuesta: "gato" },
      { pregunta: "Hago 'guau', soy el mejor amigo del hombre.", respuesta: "perro" },
      { pregunta: "Tengo alas y pico, canto por la mañana.", respuesta: "pajaro" },
      { pregunta: "Soy el rey de la selva.", respuesta: "leon" },
      { pregunta: "Tengo rayas blancas y negras.", respuesta: "cebra" },
      { pregunta: "Sirvo para escribir y tengo tinta dentro.", respuesta: "boligrafo" },
      { pregunta: "Me usas para leer, tengo páginas y letras.", respuesta: "libro" },
      { pregunta: "Tengo ruedas y motor, te llevo a cualquier lugar.", respuesta: "auto" },
      { pregunta: "Sirvo para medir el tiempo y tengo agujas.", respuesta: "reloj" }
    ]

    const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)]

    // GUARDAR CON INTENTOS
    global.acertijoActual[m.chat] = {
      respuesta: acertijo.respuesta.toLowerCase(),
      intentos: 3
    }

    await conn.sendMessage(m.chat, {
      text: `🧩 Acertijo:\n${acertijo.pregunta}\n\n💡 Tenés 3 intentos\nResponde con #respuesta <texto>`
    })
  }
}