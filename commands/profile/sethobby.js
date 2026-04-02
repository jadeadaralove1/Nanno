export default {
  command: ['setpasatiempo', 'sethobby'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix) => {
    const user = global.db.data.users[m.sender]
    const input = args.join(' ').trim()
    const pasatiemposDisponibles = [
'📚 Leer', '✍️ Escribir', '🎤 Cantar', '💃 Bailar', '🎮 Jugar',
'🎨 Dibujar', '🍳 Cocinar', '✈️ Viajar', '🏊 Nadar', '📸 Fotos',
'🎧 Música', '🏀 Básquet', '⚽ Fútbol', '🎬 Películas', '📺 Series',
'🌿 Plantas', '🧵 Manualidades', '🎲 Juegos de mesa', '🏋️ Entrenar', '🚴 Bici',
'🧘 Yoga', '🎹 Piano', '🎸 Guitarra', '🥁 Batería', '🐶 Mascotas',
'🌙 Estrellas', '♟️ Ajedrez', '🛍️ Compras', '🏕️ Camping', '🎣 Pesca',
'📱 Tecnología', '🎭 Teatro', '🍰 Hornear', '🏺 Coleccionar', '✂️ Costura',
'🧁 Postres', '🚗 Autos', '🧩 Rompecabezas', '🎳 Bolos', '🏄 Surf',
'🤿 Buceo', '🏇 Caballos', '🎨 Pintura', '🔍 Investigar', '💄 Maquillaje',
'💇 Peinar', '🛌 Dormir', '🧪 Experimentos', '🗺️ Explorar', '💎 Accesorios',
'🧸 Peluches', '🕹️ Arcade', '🎯 Dardos', '🧃 Bebidas', '🍕 Comer',
'🌧️ Lluvia', '🔥 Fogatas', '📝 Diario', '📖 Manga', '🎼 Componer',
'🎙️ Podcasts', '📦 Decorar', '🪞 Moda', '👟 Ropa', '🕯️ Velas',
'🪴 Macetas', '🍔 Hamburguesas', '🥤 Licuados', '🍫 Chocolate', '🧼 Ordenar',
'🪄 Magia', '🎈 Globos', '📚 Comics', '🧠 Acertijos', '🎮 Minecraft',
'🐱 Gatos', '🐕 Perros', '🌸 Flores', '🍟 Papas fritas', '🌊 Río',
'🏐 Vóley', '🎒 Pasear', '🧊 Helado', '📞 Charlar', '🎁 Regalos',
'🖍️ Colorear', '🎀 Pulseras', '📱 TikTok', '🎶 Karaoke', '🌈 Pegatinas',
'🛼 Patinar', '🎮 Roblox', '🍿 Snacks', '🫧 Burbujas', '🎭 Imitar voces',
'📷 Selfies', '🪁 Barrilete', '🎴 Cartas', '🧃 Matear', '🪙 Monedas', 'otros'
]
    if (!input) {
      let lista = '🎯 *Elige un pasatiempo:*\n\n'
      pasatiemposDisponibles.forEach((pasatiempo, index) => {
        lista += `${index + 1}) ${pasatiempo}\n`
      })
      lista += `\n*Ejemplos:*\n${usedPrefix}setpasatiempo 1\n${usedPrefix}setpasatiempo Leer\n${usedPrefix}setpasatiempo "Otro 🌟"`
            return m.reply(lista)
    }
    let pasatiempoSeleccionado = ''
    if (/^\d+$/.test(input)) {
      const index = parseInt(input) - 1
      if (index >= 0 && index < pasatiemposDisponibles.length) {
        pasatiempoSeleccionado = pasatiemposDisponibles[index]
      } else {
        return m.reply(`𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎ Número inválido. Selecciona un número entre 1 y ${pasatiemposDisponibles.length}`)
      }
    } 
    else {
      const inputLimpio = input.replace(/[^\w\s]/g, '').toLowerCase().trim()
      const encontrado = pasatiemposDisponibles.find(p => p.replace(/[^\w\s]/g, '').toLowerCase().includes(inputLimpio))
      if (encontrado) {
        pasatiempoSeleccionado = encontrado
      } else {
        return m.reply('𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎ Pasatiempo no encontrado. Usa el comando sin argumentos para ver la lista disponible.')
      }
    }
    if (user.pasatiempo === pasatiempoSeleccionado) {
      return m.reply(`𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎ Ya tienes establecido este pasatiempo: *${user.pasatiempo}*`)
    }
    user.pasatiempo = pasatiempoSeleccionado    
    return m.reply(`𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎ Se ha establecido tu pasatiempo:\n> *${user.pasatiempo}*`)
  },
};