export default {
  command: ["botones"],
  run: async (m, ctx) => {

    const conn = ctx.conn || ctx.client || ctx.sock

    if (!conn) return

    await conn.sendMessage(m.chat, {
      text: "Hola soy *Nanno Bot*",
      footer: "Nanno Bot",
      buttons: [
        {
          buttonId: ".menu",
          buttonText: { displayText: "📜 Menú" },
          type: 1
        },
        {
          buttonId: ".ping",
          buttonText: { displayText: "🏓 Ping" },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m })

  }
}