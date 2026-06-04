export default {
  command: ['reacciones'],
  category: 'grupo',
  isAdmin: true,

  run: async (client, m, args, usedPrefix) => {
    global.db.data.chats ||= {}
    global.db.data.chats[m.chat] ||= {}

    const chat = global.db.data.chats[m.chat]
    const opcion = (args[0] || '').toLowerCase()

    if (!opcion) {
      return m.reply(
`⚙️ REACCIONES

Estado actual: ${chat.reacciones === false ? '❌ Desactivadas' : '✅ Activadas'}

Usa:
${usedPrefix}reacciones on
${usedPrefix}reacciones off`
      )
    }

    if (opcion === 'on') {
      chat.reacciones = true
      return m.reply('✅ Reacciones activadas.')
    }

    if (opcion === 'off') {
      chat.reacciones = false
      return m.reply('❌ Reacciones desactivadas.')
    }

    return m.reply(
`Uso correcto:

${usedPrefix}reacciones on
${usedPrefix}reacciones off`
    )
  }
}