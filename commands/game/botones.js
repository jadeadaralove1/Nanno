export default {
  command: ["botones"],
  run: async (m, sock) => {

    await sock.sendMessage(m.chat, {
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