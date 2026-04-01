export default {
  command: ['unreg', 'borrarregistro', 'delreg'],
  category: 'rg',

  run: async (client, m) => {
    const user = global.db.data.users[m.sender]

    const pp = await client.profilePictureUrl(m.sender, 'image')
      .catch(() => 'https://files.catbox.moe/xr2m6u.jpg')

    if (!user.registered) {
      return m.reply('ूᰍ ֔ ⠾ ⚠️ No tienes registro activo.')
    }

    user.registered = false
    user.name = ''
    user.age = 0
    user.regTime = 0

    await client.sendMessage(m.chat, {
      text: `ूᰍ ֔ ⠾ ☠️ Tu registro fue eliminado.

> Ahora debes registrarte nuevamente si quieres usar mis comandos.`,
      contextInfo: {
        externalAdReply: {
          title: 'Registro eliminado',
          body: 'Tu acceso fue revocado',
          thumbnailUrl: pp,
          sourceUrl: 'https://whatsapp.com',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })
  }
}