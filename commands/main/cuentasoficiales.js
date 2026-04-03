export default {
  command: ['cuentasoficiales'],
  exp: 35,

  run: async (m) => {

    const media = 'https://files.catbox.moe/lcn1kw.mp4'

    let text = `🌑⚔️ BIENVENIDO(A) A LAS CUENTAS OFICIALES ⚔️🌑

💖 Shadow-BOT-MD
El poder oculto se revela solo en las sombras...

CANAL YOSUE
https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

CANAL ADO
https://whatsapp.com/channel/0029VbBIgz1HrDZg92ISUl2M

COMUNIDAD
https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N

👑 Yosue
⚔️ Ado`

    await m.send({
      video: { url: media },
      caption: text,
      gifPlayback: true
    })

  }
}