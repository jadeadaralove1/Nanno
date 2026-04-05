export default {
  command: ["banlist", "listban"],
  tags: ["owner"],
  help: ["banlist"],
  rowner: true,

  run: async (m, { conn, isOwner }) => {

    const chats = Object.entries(global.db.data.chats || {}).filter(v => v[1].isBanned)
    const users = Object.entries(global.db.data.users || {}).filter(v => v[1].banned)

    const caption = `
╔══✦🌌🎄✦══╗
   𝐒𝐇𝐀𝐃𝐎𝐖 𝐆𝐀𝐑𝐃𝐄𝐍 ❄️
   𝐋𝐈𝐒𝐓𝐀 𝐃𝐄 𝐁𝐀𝐍𝐄𝐀𝐃𝐎𝐒
╚══✦🌌🎄✦══╝

👤 *Almas selladas por las sombras*:
├ Total : ${users.length}${users.length ? '\n' + users.map(([jid]) =>
`├ ${isOwner ? '@' + jid.split('@')[0] : jid}`).join('\n') : '\n├ Ninguno'}
└────

💬 *Dominios prohibidos bajo la nieve*:
├ Total : ${chats.length}${chats.length ? '\n' + chats.map(([jid]) =>
`├ ${jid}`).join('\n') : '\n├ Ninguno'}
└────

✨ En esta navidad sombría, el Shadow Garden vigila en silencio...
`.trim()

    await conn.sendMessage(m.chat, {
      text: caption,
      mentions: conn.parseMention(caption)
    }, { quoted: m })

  }
}