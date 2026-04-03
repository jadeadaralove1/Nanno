export default {
  command: ["botones"],
  run: async (m, ctx) => {

    const conn = ctx.conn || ctx.client || ctx.sock

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
        }
      ]
    }, { quoted: m })

  }
}