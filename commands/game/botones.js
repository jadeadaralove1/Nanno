export default {
  command: ["botones"],
  run: async (m, ctx) => {

    const conn = ctx.conn || ctx.sock || ctx.client
    if (!conn) return

    const jid = m.chat || m.key?.remoteJid

    await conn.sendMessage(jid, {
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