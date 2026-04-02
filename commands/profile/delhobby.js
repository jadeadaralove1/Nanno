export default {
  command: ['delpasatiempo', 'removehobby'],
  category: 'rpg',
  run: async (client, m, args) => {
    const user = global.db.data.users[m.sender]
    if (!user.pasatiempo || user.pasatiempo === 'No definido') {
      return m.reply('𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎ No tienes ningún pasatiempo establecido.')
    }
    const pasatiempoAnterior = user.pasatiempo
    user.pasatiempo = 'No definido'    
    return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ Se ha eliminado tu pasatiempo.`)
  },
};