let handler = async (m, { conn }) => {

await conn.sendMessage(m.chat, {
  text: "👋 Hola, soy *Nanno Bot*\nElige una opción:",
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

handler.command = ["botones", "buttons"]

export default handler