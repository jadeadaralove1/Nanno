export default {
  command: ['reacciones'],
  category: 'group',
  isAdmin: true,

  run: async (client, m, args, usedPrefix) => {
    try {
      global.db.data.chats ||= {}
      global.db.data.chats[m.chat] ||= {}

      const chat = global.db.data.chats[m.chat]

      const opcion = (args[0] || '').toLowerCase()

      if (!opcion || !['on', 'off'].includes(opcion)) {
        return client.sendMessage(m.chat, {
          text:
`⚙️ *CONFIGURACIÓN DE REACCIONES*

✦ Estado actual: *${chat.reacciones === false ? 'Desactivadas' : 'Activadas'}*

✎ Usa:
➤ *${usedPrefix}reacciones on*  → Activar reacciones
➤ *${usedPrefix}reacciones off* → Desactivar reacciones`
        }, { quoted: m })
      }

      if (opcion === 'on') {
        if (chat.reacciones === true) {
          return client.sendMessage(m.chat, {
            text: '⚠️ Las reacciones ya están activadas en este chat.'
          }, { quoted: m })
        }

        chat.reacciones = true

        return client.sendMessage(m.chat, {
          text:
`✅ *REACCIONES ACTIVADAS*

😺 El bot volverá a reaccionar a palabras clave y respuestas aleatorias.`
        }, { quoted: m })
      }

      if (opcion === 'off') {
        if (chat.reacciones === false) {
          return client.sendMessage(m.chat, {
            text: '⚠️ Las reacciones ya están desactivadas en este chat.'
          }, { quoted: m })
        }

        chat.reacciones = false

        return client.sendMessage(m.chat, {
          text:
`🚫 *REACCIONES DESACTIVADAS*

🤖 El bot dejará de reaccionar automáticamente en este chat.`
        }, { quoted: m })
      }

    } catch (e) {
      console.error(e)

      return client.sendMessage(m.chat, {
        text: `❌ Error en configuración de reacciones.\n${e}`
      }, { quoted: m })
    }
  }
}