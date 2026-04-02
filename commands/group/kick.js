export default {
  command: ['kick'],
  category: 'grupo',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    if (!m.mentionedJid[0] && !m.quoted) {
      return m.reply(`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ Quiero ver a quién eliges…
respóndele o menciónalo.

> Si realmente quieres hacerlo…
> no basta con pensarlo.`)
    }
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    const groupInfo = await client.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
    const participant = groupInfo.participants.find((p) => p.phoneNumber === user || p.jid === user || p.id === user || p.lid === user)
    if (!participant) {
      return client.reply(m.chat, `𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ *@${user.split('@')[0]}* ya no está en el grupo.`, m, { mentions: [user] })
    }
    if (user === client.decodeJid(client.user.id)) {
      return m.reply(`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎¿Eliminarme… a mí? JAJAJA. 

> Error… ◜࣭࣭࣭࣭࣭᷼❌̸̷ׁᮬᰰᩫ࣭࣭࣭࣭
> Nanno no puede ser eliminada.`)
    }
    if (user === ownerGroup) {
      return m.reply(`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ Hay posiciones intocables…
y esta es una de ellas.`)
    }
    if (user === ownerBot) {
      return m.reply(`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ Hay niveles que no puedes tocar…
ni aunque creas tener el control.`)
    }
    try {
      await client.groupParticipantsUpdate(m.chat, [user], 'remove')
      client.reply(m.chat, `𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ @${user.split('@')[0]} Ya terminó… como si nunca hubiera existido.`, m, { mentions: [user] })
    } catch (e) {
      return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};