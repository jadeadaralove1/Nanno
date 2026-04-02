export default {
  command: ['demote'],
  category: 'grupo',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    const mentioned = await m.mentionedJid
    const who = mentioned.length > 0 ? mentioned[0] : m.quoted ? await m.quoted.sender : false
    if (!who) return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ ¿A quién quieres quitarle el control…?
Menciónalo.
> Si vas a quitarle el poder a alguien…
> al menos ten el valor de señalarlo..`)
    try {
      const groupMetadata = await client.groupMetadata(m.chat)
      const participant = groupMetadata.participants.find((p) => p.phoneNumber === who || p.id === who || p.lid === who || p.jid === who)
      if (!participant?.admin) return client.sendMessage(m.chat, { text: `𐄹 ۪ ׁ 😺ᩚ̼ 𖹭̫ ▎@${who.split('@')[0]} Ese usuario no tiene poder que perder.`, mentions: [who] }, { quoted: m },)
      if (who === groupMetadata.owner) return m.reply(`𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎ Hay posiciones… que no se pueden tocar.
El/la creador/a es una de ellas..`)
      if (who === client.user.jid) return m.reply(`𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎ ¿Degradarme… a mí?
> No puedes degradar a Nanno de administrador….`)
      await client.groupParticipantsUpdate(m.chat, [who], 'demote')
      await client.sendMessage(m.chat, { text: `𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎ *@${who.split('@')[0]}* Has sido degradado de administrador del grupo…

> El poder es tan fácil de perder…
> ¿no crees?

> Un momento estás arriba…
> y al siguiente… solo eres uno más`, mentions: [who] }, { quoted: m })
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};