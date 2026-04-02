export default {
  command: ['deldescription', 'deldesc'],
  category: 'rpg',
  run: async (client, m) => {
    const user = global.db.data.users[m.sender]
    if (!user.description) return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ No tienes una descripción establecida.`)
    user.description = ''
    return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ Tu descripción ha sido eliminada.`)
  },
};