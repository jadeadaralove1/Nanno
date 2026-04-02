export default {
  command: ['setgpdesc'],
  category: 'grupo',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    const newDesc = args.join(' ').trim()
    if (!newDesc)
      return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎¿Cómo quieres que lo vean…?
ingresa la descripción.`)

    try {
      await client.groupUpdateDescription(m.chat, newDesc)
      m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Ahora tienen palabras nuevas…
veamos si dicen la verdad.`)
    } catch (e) {
      return m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};