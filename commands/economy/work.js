export default {
  command: ['w', 'work', 'chambear', 'chamba', 'trabajar'],
  category: 'rpg',
  run: async (client, m, args, usedPrefix, command) => {
    const db = global.db.data
    const chat = db.chats[m.chat]
    const user = chat.users[m.sender]
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const monedas = db.settings[botId].currency
    if (chat.adminonly || !chat.economy) return m.reply(`𐄹 ۪ ׁ 🪙ᩚ̼ 𖹭̫ ▎ Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
    const cooldown = 3 * 60 * 1000
    user.lastwork = user.lastwork || 0
    if (Date.now() < user.lastwork) {
      const tiempoRestante = formatTime(user.lastwork - Date.now())
      return client.reply(m.chat, `𐄹 ۪ ׁ 🪙ᩚ̼ 𖹭̫ ▎ Debes esperar *${tiempoRestante}* para usar *${usedPrefix + command}* de nuevo.`, m)
    }
    user.lastwork = Date.now() + cooldown
    const rsl = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000
    user.coins = user.coins || 0
    user.coins += rsl
    await client.sendMessage(m.chat, { text: `𐄹 ۪ ׁ 🪙ᩚ̼ 𖹭̫ ▎ ${pickRandom(trabajo)} *¥${rsl.toLocaleString()} ${monedas}*.`, }, { quoted: m })
  }
}

function formatTime(ms) {
  const totalSec = Math.ceil(ms / 1000)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60
  const parts = []
  if (minutes > 0) parts.push(`${minutes} minuto${minutes !== 1 ? 's' : ''}`)
  parts.push(`${seconds} segundo${seconds !== 1 ? 's' : ''}`)
  return parts.join(' ')
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const trabajo = [
"Creías que solo ibas a trabajar… pero alguien siempre paga un precio más alto.", 

"Pensaste que era un empleo fácil. Qué lástima que no sabías quién estaba mirando.", 

"Te dieron dinero… pero se llevaron algo que ni notaste.", 

"Aceptaste el trabajo sin preguntar. Ahora las preguntas vienen solas.", 

"Era solo un día más… hasta que dejó de serlo.", 

"Te prometieron una recompensa. Nunca dijeron en qué consistía realmente.", 

"Sonreíste al recibir el pago… no sabías que ya habías perdido.", 

"Todo parecía normal… hasta que empezaste a sentir que algo no encajaba.", 

"Elegiste ese camino. Nadie te obligó… ¿o sí?", 

"El dinero llegó rápido. Las consecuencias… más rápido todavía.", 

"Te dijeron que era una oportunidad. No mencionaron el riesgo.", 

"Creíste que estabas ganando. Qué adorable.", 

"Aceptaste el trato… aunque nunca entendiste las reglas.", 

"Parecía un simple favor. Terminó siendo una deuda.", 

"Pensaste que nadie lo sabría. Error.", 

"El trabajo terminó… pero esto recién empieza.", 

"¿Valió la pena? No hace falta que respondas… ya lo sé.", 

"Todos tienen un precio. El tuyo fue más bajo de lo que esperaba.", 

"Te gustó jugar… ahora aguantá las consecuencias.", 

"Lo hiciste por dinero. Siempre empiezan así.", 

"Creíste que eras especial. Solo eras el siguiente.", 

"Tomaste una decisión pequeña… con resultados irreversibles.", 

"Todo era divertido… hasta que dejó de serlo.", 

"Te observé desde el principio. Nunca estuviste solo." , 

"Esto no es un castigo… es lo que elegiste."
];