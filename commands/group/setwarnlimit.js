export default {
  command: ['setwarnlimit'],
  category: 'group',
  isAdmin: true,
  run: async (client, m, args) => {
    const chat = global.db.data.chats[m.chat]
    const raw = args[0]
    const limit = parseInt(raw)
    if (isNaN(limit) || limit < 0 || limit > 10) {
      return m.reply(`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ El límite de advertencias debe ser un número entre \`1\` y \`10\`, o \`0\` para desactivar.\n> Ejemplo 1 › *${prefa}setwarnlimit 5*\n> Ejemplo 2 › *${prefa}setwarnlimit 0*\n\n> Si usas \`0\`, se desactivará la función de eliminar usuarios al alcanzar el límite de advertencias.\n♡ Estado actual: ${chat.expulsar ? `\`${chat.warnLimit}\` advertencias` : '`Desactivado`'}`)
    }
    if (limit === 0) {
      chat.warnLimit = 0
      chat.expulsar = false
      return m.reply(`𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎Cambio aplicado…
la eliminación por advertencias está desactivada.

> Les diste una segunda oportunidad…
> veamos qué hacen con ella.`)
    }
    chat.warnLimit = limit
    chat.expulsar = true
    await m.reply(`𐄹 ۪ ׁ 💉ᩚ̼ 𖹭̫ ▎ Límite de advertencias establecido en \`${limit}\` para este grupo.\n> ♡ Los usuarios serán eliminados automáticamente al alcanzar este límite.`)
  },
};