export default {
  command: ['cuentasoficiales'],
  exp: 35,

  run: async function(m, ctx) { // ctx es un objeto que contiene conn
    try {
      const media = 'https://files.catbox.moe/lcn1kw.mp4'

      const text = `🌑⚔️ 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊(𝘼) 𝘼 𝙇𝘼𝙎 𝘾𝙐𝙀𝙉𝙏𝘼𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎 ⚔️🌑
💜 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇 𝘼𝘾𝘾𝙊𝙐𝙉𝙏𝙎
...
🌌 Shadow-BOT-MD`

      await ctx.conn.sendMessage(m.chat, {
        video: { url: media },
        caption: text,
        gifPlayback: true
      }, { quoted: m })

    } catch (error) {
      console.error('Error en cuentasoficiales:', error)
      await ctx.conn.sendMessage(m.chat, {
        text: '❌ Ocurrió un error al ejecutar el comando.'
      }, { quoted: m })
    }
  }
}