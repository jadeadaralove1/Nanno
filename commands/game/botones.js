export default {
  command: ["botones"],
  run: async (m, { conn }) => {

    await conn.sendMessage(m.chat, {
      text: "Hola soy Nanno Bot",
      footer: "Nanno Bot",
      buttons: [
        {
          buttonId: ".menu",
          buttonText: { displayText: "📜 Menú" },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m })

  }
}