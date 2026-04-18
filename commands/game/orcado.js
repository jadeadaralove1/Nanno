let partidas = {}

const ahorcadoStages = [
    +------+   |      |   |   |   |   |   ===========,
    +------+   |      |   O      |   |   |   |   ===========,
    +------+   |      |   O      |   |      |   |   |   ===========,
    +------+   |      |   O      |   /|      |   |   |   ===========,
    +------+   |      |   O      |   /|\\     |   |   |   ===========,
    +------+   |      |   O      |   /|\\     |   /       |   |   ===========,
    +------+   |      |   O      |   /|\\     |   / \\     |   |   ===========,
]

function ocultarPalabra(palabra, letras) {
return palabra
.split('')
.map(l => (letras.includes(l) ? l : '_'))
.join(' ')
}

export default {
command: ['orcado', 'ahorcado', 'letra'],
tags: ['game'],
help: ['orcado', 'letra <letra>'],
group: true,

run: async (conn, m, args) => {
const command = (m.text || '').split(' ')[0].slice(1).toLowerCase()
const text = args.join(' ')
const chatId = m.chat
const jugador = m.pushName || m.sender

const palabras = [  
  { palabra: "galaxia", pista: "Conjunto enorme de estrellas 🌌" },  
  { palabra: "estrella", pista: "Brilla en el cielo ✨" },  
  { palabra: "cometa", pista: "Tiene cola ☄️" },  
  { palabra: "planeta", pista: "Gira alrededor del sol 🪐" },  
  { palabra: "aurora", pista: "Luces del cielo polar 🌈" },  
  { palabra: "dragon", pista: "Escupe fuego 🐉" },  
  { palabra: "magia", pista: "Poder sobrenatural 🪄" },  
  { palabra: "fantasia", pista: "Mundo imaginario 🧙" },  
  { palabra: "invierno", pista: "Hace frío ❄️" },  
  { palabra: "navidad", pista: "Fiesta 🎄" },  
  { palabra: "regalo", pista: "Se da 🎁" },  
  { palabra: "nieve", pista: "Blanca ❄️" },  
  { palabra: "trineo", pista: "Santa 🎅" },  
  { palabra: "diamante", pista: "Piedra 💎" },  
  { palabra: "tesoro", pista: "Oro escondido 🏴‍☠️" },  
  { palabra: "reino", pista: "Gobernado por rey 👑" },  
  { palabra: "leyenda", pista: "Historia 📖" },  
  { palabra: "espiritu", pista: "Fantasma 👻" },  
  { palabra: "luz", pista: "Ilumina 💡" },  
  { palabra: "eterno", pista: "Sin fin ♾️" },  
  { palabra: "cristal", pista: "Transparente 🔮" },  
  { palabra: "guardian", pista: "Protege ⚔️" },  
  { palabra: "infinito", pista: "Sin límite ♾️" },  
  { palabra: "demitra", pista: "Tu bot 😏" },  
  { palabra: "omega", pista: "Última letra 🔚" }  
]  

// 🎮 INICIAR  
if (command === 'orcado' || command === 'ahorcado') {  
  const seleccion = palabras[Math.floor(Math.random() * palabras.length)]  

  partidas[chatId] = {  
    jugador,  
    palabra: seleccion.palabra,  
    pista: seleccion.pista,  
    letras: [],  
    errores: 0  
  }  

  const mensaje = `⣴⣿⣦⣀⣴⣿✿⣦

　𝜗ϱ　　　˚　　　🪢 AHORCADO ⁺　　　

୨  🦭 ୧  𝗝ᥙgᥲძ᥆r : ${jugador}

ׅ  ׄ 🔘̼̼  ׅ   :: 𝗣alabra :
${ocultarPalabra(seleccion.palabra, [])}

୨୧꯭   ㅤ̠ 🄿𝗂𝗌𝗍𝖺𝗌 :

> ${seleccion.pista}



⢷     ◟ 　 Usa ".letra a"`

return conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })  
}  

// 🔤 ADIVINAR  
if (command === 'letra') {  
  if (!partidas[chatId]) {  
    return conn.sendMessage(m.chat, { text: "⚠️ Usa *.orcado* primero" }, { quoted: m })  
  }  

  if (!text) {  
    return conn.sendMessage(m.chat, { text: "✍️ Escribe una letra" }, { quoted: m })  
  }  

  const partida = partidas[chatId]  
  const letra = text.toLowerCase().trim()  

  if (partida.letras.includes(letra)) {  
    return conn.sendMessage(m.chat, { text: `⚠️ Ya usaste "${letra}"` }, { quoted: m })  
  }  

  partida.letras.push(letra)  

  const palabraOculta = ocultarPalabra(partida.palabra, partida.letras)  

  // ✅ ACIERTO  
  if (partida.palabra.includes(letra)) {  
    if (!palabraOculta.includes('_')) {  
      delete partidas[chatId]  

      return conn.sendMessage(m.chat, {  
        text: `🎉 GANASTE 🎉

👤 ${jugador}
🔤 ${partida.palabra}`
}, { quoted: m })
}

return conn.sendMessage(m.chat, {  
      text: `${ahorcadoStages[partida.errores]}

✅ Correcto

${palabraOculta}`
}, { quoted: m })
}

// ❌ ERROR  
  partida.errores++  

  if (partida.errores >= ahorcadoStages.length - 1) {  
    const palabra = partida.palabra  
    delete partidas[chatId]  

    return conn.sendMessage(m.chat, {  
      text: `${ahorcadoStages[ahorcadoStages.length - 1]}

💀 PERDISTE
👤 ${jugador}
🔤 ${palabra}`
}, { quoted: m })
}

return conn.sendMessage(m.chat, {  
    text: `${ahorcadoStages[partida.errores]}

❌ Incorrecto: ${letra}

${palabraOculta}

❤️ Intentos: ${ahorcadoStages.length - 1 - partida.errores}`
}, { quoted: m })
}
}
}
