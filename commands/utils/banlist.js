export default {
  command: ["banlist", "listban"],
  rowner: true,

  run: async (m) => {

    const db = global.db?.data || {}

    const chats = Object.entries(db.chats || {})
      .filter(([jid, data]) => typeof jid === "string" && jid.includes("@") && data?.isBanned)

    const users = Object.entries(db.users || {})
      .filter(([jid, data]) => typeof jid === "string" && jid.includes("@") && data?.banned)

    const userList = users.length
      ? users.map(([jid]) => `• ${jid}`).join("\n")
      : "• Ninguno"

    const chatList = chats.length
      ? chats.map(([jid]) => `• ${jid}`).join("\n")
      : "• Ninguno"

    const caption = `
╔══✦🌌✦══╗
 SHADOW GARDEN
 LISTA DE BANEADOS
╚══✦🌌✦══╝

👤 Usuarios: ${users.length}
${userList}

💬 Chats: ${chats.length}
${chatList}
`.trim()

    await m.reply(caption)

  }
}