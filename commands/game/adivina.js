let partidas = {}; // partidas activas por chat

const peliculas = [
  { nombre: "Titanic", emojis: "🚢💔❤️" },
  { nombre: "El Rey León", emojis: "🦁👑🌅" },
  { nombre: "Stranger Things", emojis: "👦🏻🚲👽🌌" },
  { nombre: "Harry Potter", emojis: "🧙‍♂️⚡🦉" },
  { nombre: "Jurassic Park", emojis: "🦖🌴🚗" },
  { nombre: "Friends", emojis: "👫☕️🏢" },
  { nombre: "Avengers", emojis: "🦸‍♂️🦸‍♀️💥🌍" },
];

export default {
  command: ['adivina', 'adivinaemoji'],
  tags: ['game'],
  help: ['adivina', 'adivina <respuesta>'],
  group: true,

  run: async (conn, m, args) => {
    const chatId = m.chat;

    // Iniciar juego
    if (!args[0]) {
      if (partidas[chatId]) return conn.sendMessage(chatId, { text: "⚠️ Ya hay una partida en curso, adivina la película con emojis." }, { quoted: m });

      const seleccion = peliculas[Math.floor(Math.random() * peliculas.length)];
      partidas[chatId] = {
        nombre: seleccion.nombre.toLowerCase(),
        emojis: seleccion.emojis,
        jugador: null // opcional si queremos guardar el primer que responda
      };

      const msg = `🎬 *Adivina la película/serie* 🎬

${seleccion.emojis}

Escribe #adivina <respuesta> para adivinar. ¡Solo la primera correcta gana!`;
      return conn.sendMessage(chatId, { text: msg }, { quoted: m });
    }

    // Validar respuesta
    if (!partidas[chatId]) return;
    const respuesta = args.join(" ").toLowerCase();
    const partida = partidas[chatId];

    if (respuesta === partida.nombre) {
      delete partidas[chatId];
      return conn.sendMessage(chatId, { text: `🎉 ¡Correcto! Felicidades ${m.pushName} 😎\nLa respuesta era: *${partida.nombre}*` }, { quoted: m });
    } else {
      return conn.sendMessage(chatId, { text: `❌ Incorrecto, sigue intentando...` }, { quoted: m });
    }
  }
};