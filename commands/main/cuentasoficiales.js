export default {
  command: ['cuentasoficiales'],
  exp: 35,

  run: async (m) => {

    const media = 'https://files.catbox.moe/lcn1kw.mp4'

    let text = `🌑⚔️ 𝘽𝙄𝙀𝙉𝙑𝙀𝙉𝙄𝘿𝙊(𝘼) 𝘼 𝙇𝘼𝙎 𝘾𝙐𝙀𝙉𝙏𝘼𝙇𝙀𝙎 ⚔️🌑
💜 𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝙏𝙃𝙀 𝙊𝙁𝙁𝙄𝘾𝙄𝘼𝙇 𝘼𝘾𝘾𝙊𝙐𝙉𝙏𝙎
┈┈┈┈┈┈┈┈┈┈
💖 𝙎𝙝𝙖𝙙𝙤𝙬-𝘽𝙊𝙏-𝙈𝘿 ⚔️✨
『☽』 El poder oculto se revela solo en las sombras...
┈┈┈┈┈┈┈┈┈┈
✅ *CANAL OFICIAL - YOSUE*
https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

✅ *CANAL OFICIAL - ADO*
https://whatsapp.com/channel/0029VbBIgz1HrDZg92ISUl2M

✅ *COMUNIDAD OFICIAL*
https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N

👑 Creador Principal: +58 424-2773183 (Yosue)
⚔️ Segundo Creador: +504 9373-2693 (Ado)

🌌✨ *Shadow-BOT-MD* — El jardín sombrío nunca duerme ✨🌌`

    await m.reply({
      video: { url: media },
      caption: text,
      gifPlayback: true
    })

  }
}