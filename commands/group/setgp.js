export default {
  command: ['setgpname'],
  category: 'grupo',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    const newName = args.join(' ').trim()
    if (!newName)
      return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎¿Cómo quieres que lo llamen ahora…?
ingresa el nuevo nombre del grupo.`)
    try {
      await client.groupUpdateSubject(m.chat, newName)
      m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Listo…
el grupo tiene un nuevo nombre.

> Una nueva identidad…
> pero el fondo sigue siendo el mismo, ¿no crees?`)
    } catch (e) {
     return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};