export default {
  command: ["botones"],
  run: async (m) => {

    const conn = m.sock || m.conn

    await conn.sendMessage(m.chat, {
      text: "Hola soy *Nanno Bot*",
      footer: "Nanno Bot",
      templateButtons: [
        {
          index: 1,
          quickReplyButton: {
            displayText: "📜 Menú",
            id: ".menu"
          }
        },
        {
          index: 2,
          quickReplyButton: {
            displayText: "🏓 Ping",
            id: ".ping"
          }
        }
      ]
    }, { quoted: m })

  }
}