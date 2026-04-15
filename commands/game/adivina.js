let partidas = {}; // partidas activas por chat

const peliculas = [
{ nombre: "Titanic", emojis: "🚢💔🌊" },
{ nombre: "El Rey Leon", emojis: "🦁👑🌅" },
{ nombre: "Frozen", emojis: "❄️👸⛄" },
{ nombre: "Shrek", emojis: "👹💚👸" },
{ nombre: "Toy Story", emojis: "🤠🚀🧸" },
{ nombre: "Cars", emojis: "🚗🏁🔥" },
{ nombre: "Buscando a Nemo", emojis: "🐠🌊🔍" },
{ nombre: "Buscando a Dory", emojis: "🐟💙🔍" },
{ nombre: "Monsters Inc", emojis: "👹🏢👧" },
{ nombre: "Up", emojis: "🎈🏠👴" },

{ nombre: "Coco", emojis: "💀🎸🌺" },
{ nombre: "Intensamente", emojis: "😊😢😡🧠" },
{ nombre: "Los Increibles", emojis: "🦸‍♂️👨‍👩‍👧‍👦💥" },
{ nombre: "Ratatouille", emojis: "🐀👨‍🍳🍝" },
{ nombre: "Wall E", emojis: "🤖🌍💛" },
{ nombre: "Encanto", emojis: "🏠✨🌸" },
{ nombre: "Moana", emojis: "🌊🛶🌺" },
{ nombre: "Aladdin", emojis: "🧞‍♂️🕌✨" },
{ nombre: "La Sirenita", emojis: "🧜‍♀️🌊🐚" },
{ nombre: "Blancanieves", emojis: "🍎👸🐦" },

{ nombre: "Cenicienta", emojis: "👠🎃✨" },
{ nombre: "Rapunzel", emojis: "👸💇‍♀️🏰" },
{ nombre: "Hercules", emojis: "💪⚡🏛️" },
{ nombre: "Mulán", emojis: "⚔️👧🐉" },
{ nombre: "Tarzan", emojis: "🌴🐒👦" },
{ nombre: "Peter Pan", emojis: "🧚‍♂️🏴‍☠️🌙" },
{ nombre: "Dumbo", emojis: "🐘🎪✈️" },
{ nombre: "Bambi", emojis: "🦌🌲🌸" },
{ nombre: "Madagascar", emojis: "🦁🦓🐧" },
{ nombre: "Kung Fu Panda", emojis: "🐼🥋🍜" },

{ nombre: "Megamente", emojis: "🧠💙🦸‍♂️" },
{ nombre: "Mi Villano Favorito", emojis: "😈🍌👶" },
{ nombre: "Minions", emojis: "🍌😄👓" },
{ nombre: "Hotel Transilvania", emojis: "🧛‍♂️🏨👻" },
{ nombre: "La Era de Hielo", emojis: "🦣❄️🐿️" },
{ nombre: "Rio", emojis: "🐦🌴🎶" },
{ nombre: "Zootopia", emojis: "🐰🦊🚓" },
{ nombre: "Bolt", emojis: "🐶⚡🎬" },
{ nombre: "Luca", emojis: "🌊👦🐟" },
{ nombre: "Turning Red", emojis: "🐼❤️👧" },

{ nombre: "Spiderman", emojis: "🕷️🕸️🦸‍♂️" },
{ nombre: "Batman", emojis: "🦇🌃🦸‍♂️" },
{ nombre: "Superman", emojis: "🦸‍♂️🌍✈️" },
{ nombre: "Iron Man", emojis: "🤖❤️🦸‍♂️" },
{ nombre: "Hulk", emojis: "💚💪😡" },
{ nombre: "Thor", emojis: "⚡🔨🦸‍♂️" },
{ nombre: "Capitan America", emojis: "🛡️🇺🇸🦸‍♂️" },
{ nombre: "Doctor Strange", emojis: "🔮🌀🧙‍♂️" },
{ nombre: "Black Panther", emojis: "🐆👑⚫" },
{ nombre: "Guardianes de la Galaxia", emojis: "🚀🌌🦝" },

{ nombre: "Avengers", emojis: "🦸‍♂️💥🌍" },
{ nombre: "Harry Potter", emojis: "🧙‍♂️⚡🦉" },
{ nombre: "El Señor de los Anillos", emojis: "💍🔥🧙‍♂️" },
{ nombre: "Star Wars", emojis: "⚔️🌌🤖" },
{ nombre: "Jurassic Park", emojis: "🦖🌴🚗" },
{ nombre: "King Kong", emojis: "🦍🏙️💥" },
{ nombre: "Godzilla", emojis: "🦖🌊🔥" },
{ nombre: "Jumanji", emojis: "🎲🌴🐘" },
{ nombre: "Matrix", emojis: "💊🕶️💻" },
{ nombre: "Avatar", emojis: "🌌💙🌿" },

{ nombre: "Frozen 2", emojis: "❄️👸🌊" },
{ nombre: "Toy Story 2", emojis: "🤠🚀🎁" },
{ nombre: "Cars 2", emojis: "🚗🌍🕵️" },
{ nombre: "Los Increibles 2", emojis: "🦸‍♀️👶💥" },
{ nombre: "Shrek 2", emojis: "👹👸👑" },
{ nombre: "Minions 2", emojis: "🍌😎🎬" },
{ nombre: "Coco 2", emojis: "💀🎸🌺✨" },
{ nombre: "Moana 2", emojis: "🌊🛶🌴✨" },
{ nombre: "Encanto 2", emojis: "🏠✨🌸🎶" },
{ nombre: "Up 2", emojis: "🎈🏠👴✨" },

{ nombre: "La Mascara", emojis: "🎭💚😂" },
{ nombre: "Forrest Gump", emojis: "🏃‍♂️🍫🪶" },
{ nombre: "El Hombre Araña", emojis: "🕷️🕸️🦸‍♂️" },
{ nombre: "Rapidos y Furiosos", emojis: "🚗🔥🏁" },
{ nombre: "Piratas del Caribe", emojis: "🏴‍☠️⚓🍹" },
{ nombre: "El Conjuro", emojis: "👻🏚️🔔" },
{ nombre: "Annabelle", emojis: "🧸👻😱" },
{ nombre: "It", emojis: "🎈🤡🩸" },
{ nombre: "Saw", emojis: "🪚🩸😨" },
{ nombre: "Scream", emojis: "😱🔪📞" },

{ nombre: "Mi Pobre Angelito", emojis: "👦🏠🎄" },
{ nombre: "Matilda", emojis: "📚👧✨" },
{ nombre: "Beethoven", emojis: "🐶🎹❤️" },
{ nombre: "Garfield", emojis: "🐱🍝😴" },
{ nombre: "Scooby Doo", emojis: "🐕👻🍔" },
{ nombre: "Los Simpson", emojis: "🍩👨‍👩‍👧‍👦" },
{ nombre: "Bob Esponja", emojis: "🧽🍍🌊" },
{ nombre: "Peppa Pig", emojis: "🐷🌧️👨‍👩‍👧" },
{ nombre: "Dragon Ball", emojis: "🐉⚡👊" },
{ nombre: "Naruto", emojis: "🍜👦🔥" }
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