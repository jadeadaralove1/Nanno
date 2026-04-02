export default {
  command: ['delgenre'],
  category: 'rpg',
  run: async (client, m) => {
    const user = global.db.data.users[m.sender]
    if (!user.genre) return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ No tienes un género asignado.`)
    user.genre = ''
    return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ Tu género ha sido eliminado.`)
  },
};