export default {
  command: ["banlist", "listban"],
  rowner: true,

  run: async (m) => {

    const chats = Object.entries(global.db.data.chats || {})
      .filter(([jid, data]) => jid && jid.includes("@") && data.isBanned)

    const users = Object.entries(global.db.data.users || {})
      .filter(([jid, data]) => jid && jid.includes("@") && data.banned)

    const caption = `
╔══✦🌌🎄✦══╗
  SHADOW GARDEN
  LISTA DE BANEADOS
╚══✦🌌🎄✦══╝

👤 Usuarios baneados: ${users.length}

${users.map(([jid]) => `• ${jid}`).join("\n") || "• Ninguno"}

💬 Chats baneados: ${chats.length}

${chats.map(([jid]) => `• ${jid}`).join("\n") || "• Ninguno"}
`.trim()

    await m.reply(caption)

  }
}