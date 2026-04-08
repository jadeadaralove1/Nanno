import { createHash } from 'crypto'

export default {
  command: ['verify', 'verificar', 'reg', 'register', 'registrar'],
  category: 'rg',

  run: async (client, m, args, usedPrefix, command) => {

    // 🔥 FIX 1: asegurar sender válido
    let sender = m.sender
    if (typeof sender !== 'string') {
      sender = m.key?.participant || m.key?.remoteJid || ''
    }

    if (!sender) {
      return m.reply('Error: no se pudo identificar al usuario.')
    }

    const text = args.join(' ')

    // 🔥 FIX 2: asegurar usuario en DB
    if (!global.db.data.users[sender]) {
      global.db.data.users[sender] = {}
    }

    const user = global.db.data.users[sender]

    const icon = 'https://files.catbox.moe/i5ctrj.jpg'

    const pp = await client.profilePictureUrl(sender, 'image')
      .catch(() => 'https://files.catbox.moe/xr2m6u.jpg')

    const name2 = m.pushName || 'Usuario'

    if (user.registered) {
      return m.reply(`ूᰍ ֔ ⠾ 💉 Ya estás registrado, ${name2}.`)
    }

    const regex = /\|?(.*)([.|] *?)([0-9]*)$/i

    if (!regex.test(text)) {
      return await client.sendMessage(m.chat, {
        text: `╭⛃𝆆ㅤㅤ╱ㅤㅤNANNOㅤㅤ𝆶ㅤ📼ㅤ❜ 
│          𝗥egístrate así
│
│ ▸ ${usedPrefix + command} nombre.edad
│
│ 𝗘jemplo:
│ ▸ ${usedPrefix + command} ${name2}.18
╰─────────────`,
        contextInfo: {
          externalAdReply: {
            title: 'ूᰍ ֔ ⠾ 💉 Registro requerido',
            body: 'Debes registrarte para usar comandos',
            thumbnailUrl: icon,
            sourceUrl: 'https://whatsapp.com',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })
    }

    let [_, name, __, age] = text.match(regex)
    age = parseInt(age)

    if (age > 60) {
      return m.reply('ूᰍ ֔ ⠾ 💉 No puedes registrarte con más de 60 años.')
    }

    if (age < 10 || isNaN(age)) {
      return m.reply('ूᰍ ֔ ⠾ 💉 Edad inválida. Debes tener al menos 10 años.')
    }

    user.name = `${name.trim()}⋆NANNO⋆`
    user.age = age
    user.regTime = Date.now()
    user.registered = true

    // 🔥 FIX 3: usar sender seguro
    const sn = createHash('md5')
      .update(sender)
      .digest('hex')
      .slice(0, 20)

    const certificado = `
╭'⛃𝆆ㅤㅤ╱ㅤㅤㅤNANNOㅤㅤㅤ𝆶ㅤㅤ📼ㅤㅤ❜╮
│ 
>  Nombre: ${name.trim()}
│ ♡ Edad: ${age} años
│ Sello: ${sn}
│
│ 🥿 Registro completado
> Ya puedes usar comandos
╰🔘ㅤ  ╱  NANNOㅤNOWHEREㅤ      ㅤ╯
`.trim()

    await client.sendMessage(m.chat, {
      react: {
        text: '♠',
        key: m.key
      }
    })

    await client.sendMessage(m.chat, {
      image: { url: pp },
      caption: certificado
    }, { quoted: m })
  }
}