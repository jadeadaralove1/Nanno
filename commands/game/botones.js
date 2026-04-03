export default {
  command: ["botones"],
  run: async (m, ctx) => {

    const conn = ctx.conn || ctx.sock || ctx.client
    if (!conn || typeof conn.sendMessage !== "function") {
      console.log("No hay conexión válida en ctx:", Object.keys(ctx || {}))
      return
    }

    const jid = m.chat || m.key?.remoteJid
    if (!jid) {
      console.log("No se pudo obtener el JID del mensaje")
      return
    }

    await conn.sendMessage(jid, {
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