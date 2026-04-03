export default {
  command: ['bot', 'nanno'],
  tags: ['fun'],
  help: ['#bot o #demi'],
  group: true,

  run: async (conn, m, args) => {
    // Lista de patrones (puedes agregar más)
    const patrones = [
      { palabras: ["hola","hey","hi"], respuestas: ["¡Hola! 😃","Hey! 👋","¡Qué gusto verte! 😎"] },
      { palabras: ["triste","mal","deprimido"], respuestas: ["😿 Ánimo, todo mejorará","💛 Un abrazo virtual","No te preocupes, todo mejora"] },
      { palabras: ["pelotuda","tonta","idiota"], respuestas: ["😼 Ja! Mira quién habla 😏","😡 Qué atrevida 😤","🙄 Aprende a hablar primero 😾"] }
      // ... agregar más patrones
    ];

    // Respuestas aleatorias generales (si no coincide ningún patrón)
    const respuestasAleatorias = [
      "💛 Un abrazo virtual para ti", "😄 Qué alegría escuchar eso!", "🎉 Sigue así!",
      "Me encanta verte feliz 😎", "😅 ¿Jugamos algo?", "🙃 Podemos inventar historias!",
      "Tiempo de diversión 😏", "😴 Tómate un descanso", "☕ Una buena taza de café ayuda"
      // ... puedes agregar más
    ];

    // Obtener el mensaje en minúsculas
    const texto = m.text.toLowerCase();

    // Buscar patrón que coincida
    let encontrado = false;
    for (const patron of patrones) {
      for (const palabra of patron.palabras) {
        if (texto.includes(palabra)) {
          // Elegir respuesta aleatoria del patrón
          const respuesta = patron.respuestas[Math.floor(Math.random() * patron.respuestas.length)];
          await conn.sendMessage(m.chat, { text: respuesta });
          encontrado = true;
          break;
        }
      }
      if (encontrado) break;
    }

    // Si no coincide ningún patrón, enviar respuesta aleatoria
    if (!encontrado) {
      const respuesta = respuestasAleatorias[Math.floor(Math.random() * respuestasAleatorias.length)];
      await conn.sendMessage(m.chat, { text: respuesta });
    }
  }
}