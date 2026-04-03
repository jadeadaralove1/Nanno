export default {
  command: ['acertijo', 'riddle'],
  tags: ['fun'],
  help: ['#acertijo o #riddle', '#respuesta <tu respuesta>'],
  group: true,

  run: async (conn, m, args) => {
    // Inicializar memoria de acertijos por chat
    global.acertijoActual = global.acertijoActual || {};

    // Si el usuario usa #respuesta
    if (args[0]?.toLowerCase() === "respuesta") {
      const userRespuesta = args.slice(1).join(" ").toLowerCase();
      const correcta = global.acertijoActual[m.chat];

      if (!correcta) 
        return conn.sendMessage(m.chat, { text: "⚠️ No hay acertijo activo. Pide uno con #acertijo" });

      if (userRespuesta === correcta) {
        await conn.sendMessage(m.chat, { text: "🎉 ¡Correcto! ¡Bien hecho!" });
        delete global.acertijoActual[m.chat]; // borrar acertijo resuelto
      } else {
        await conn.sendMessage(m.chat, { text: "❌ Incorrecto, inténtalo de nuevo 😅" });
      }
      return;
    }

    // Lista de acertijos (ejemplo limpio y con comas correctas)
    const acertijos = [
      { pregunta: "Soy roja y redonda, me usan en ensaladas y postres.", respuesta: "manzana" },
      { pregunta: "Soy amarilla y curvada, perfecta para un snack.", respuesta: "banana" },
      { pregunta: "Soy pequeña, roja y dulce, crezco en el jardín.", respuesta: "fresa" },
      { pregunta: "Soy naranja y me exprimes para jugo.", respuesta: "naranja" },
      { pregunta: "Soy grande, gris y tengo trompa.", respuesta: "elefante" },
      { pregunta: "Hago 'miau', me gusta cazar ratones.", respuesta: "gato" },
      { pregunta: "Hago 'guau', soy el mejor amigo del hombre.", respuesta: "perro" },
      { pregunta: "Tengo alas y pico, canto por la mañana.", respuesta: "pájaro" },
      { pregunta: "Soy el rey de la selva.", respuesta: "león" },
      { pregunta: "Tengo rayas blancas y negras.", respuesta: "cebra" },
      { pregunta: "Sirvo para escribir y tengo tinta dentro.", respuesta: "bolígrafo" },
      { pregunta: "Me usas para leer, tengo páginas y letras.", respuesta: "libro" },
      { pregunta: "Tengo ruedas y motor, te llevo a cualquier lugar.", respuesta: "auto" },
      { pregunta: "Sirvo para medir el tiempo y tengo agujas.", respuesta: "reloj" }
    ];

    // Elegir un acertijo aleatorio
    const acertijo = acertijos[Math.floor(Math.random() * acertijos.length)];

    // Guardar respuesta correcta
    global.acertijoActual[m.chat] = acertijo.respuesta.toLowerCase();

    // Enviar el acertijo
    await conn.sendMessage(m.chat, {
      text: `🧩 Acertijo: ${acertijo.pregunta}\n\nResponde con #respuesta <tu respuesta>`
    });
  }
};