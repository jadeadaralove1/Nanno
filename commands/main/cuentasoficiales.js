export default {
  command: ['cuentasoficiales'],
  exp: 35,

  run: async (m, { conn }) => {
    try {
      const media = 'https://files.catbox.moe/lcn1kw.mp4'

      const text = `🌑⚔️ 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊(𝘼) 𝘼 𝙇𝘼𝙎 𝘾𝙐𝙀𝙉𝙏𝘼𝙎 𝙊𝙁𝙄𝘾𝙄𝘼𝙇𝙀𝙎 ⚔️🌑
💜 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇 𝘼𝘾𝘾𝙊𝙐𝙉𝙏𝙎

✅ CANAL OFICIAL - YOSUE
https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

✅ CANAL OFICIAL - ADO
https://whatsapp.com/channel/0029VbBIgz1HrDZg92ISUl2M

✅ COMUNIDAD OFICIAL
https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N

👑 Creador Principal: Yosue
⚔️ Segundo Creador: Ado

🌌 Shadow-BOT-MD`

      await conn.sendMessage(m.chat, {
        video: { url: media }, // video o GIF
        caption: text,
        gifPlayback: true
      }, { quoted: m })

    } catch (error) {
      console.error('Error en comando cuentasoficiales:', error)
      await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al ejecutar el comando.' }, { quoted: m })
    }
  }
}