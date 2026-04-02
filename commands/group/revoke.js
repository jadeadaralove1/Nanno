export default {
  command: ['revoke', 'restablecer'],
  category: 'grupo',
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    try {
      await client.groupRevokeInvite(m.chat)
      const code = await client.groupInviteCode(m.chat)
      const link = `https://chat.whatsapp.com/${code}`
      const teks = `🌟=== Enlace del Grupo Actualizado ===🌟

👤 Solicitado por: @${m.sender.split('@')[0]}

🔗 Nuevo enlace: ${link}

✨ ¡No te lo pierdas! ✨`;
      await m.react('🕒')
      await client.reply(m.chat, teks, m, { mentions: [m.sender] })
      await m.react('✔️')
    } catch (e) {
      await m.react('✖️')
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
}