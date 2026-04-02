import { resolveLidToRealJid } from "../../lib/utils.js"

export default {
  command: ['delwarn'],
  category: 'group',
  isAdmin: true,
  run: async (client, m, args) => {
    const chat = global.db.data.chats[m.chat]
    const mentioned = m.mentionedJid || []
    const who2 = mentioned.length > 0 ? mentioned[0] : (m.quoted ? m.quoted.sender : false)
    if (!who2) return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎Debes mencionar o responder al usuario correspondiente.
Las advertencias no desaparecen por sí solas… alguien tiene que hacerse responsable.`)
    const targetId = await resolveLidToRealJid(who2, client, m.chat)
    const user = chat.users[targetId]
    if (!user) return m.reply(`𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎No se encontró al usuario en la base de datos.
O tal vez… nunca perteneció a este lugar.`)
    const total = user?.warnings?.length || 0
    if (total === 0) {
      return client.reply(m.chat, `𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎ El usuario  @${targetId.split('@')[0]} no tiene advertencias registradas. Pero todo empieza en algún momento… ¿no?`, m, { mentions: [targetId] })
    }
    const name = global.db.data.users[targetId]?.name || 'Usuario'
    const rawIndex = mentioned.length > 0 ? args[1] : args[0]
    if (rawIndex?.toLowerCase() === 'all') {
      user.warnings = []
      return client.reply(m.chat, `𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎Se han eliminado todas las advertencias del usuario.
Qué fácil es empezar de nuevo… cuando alguien decide olvidar. @${targetId.split('@')[0]} (${name}).`, m, { mentions: [targetId] })
    }
    const index = parseInt(rawIndex)
    if (isNaN(index)) {
      return m.reply(`> 𐄹 ۪ ׁ 🥀ᩚ̼ 𖹭̫ ▎Si quieres hacerlo, tendrás que ser más claro…
Debes decir exactamente qué advertencia deseas eliminar… el índice preciso.

> O… si prefieres desaparecerlo todo de una vez…
simplemente di “all”… y verás cómo todo se desvanece.`)
    }
    if (index < 1 || index > total) {
      return m.reply(`> 𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎Ah… no puedes elegir cualquier cosa…
> El índice tiene que estar dentro del juego.
> Un número… entre 1 y ${total}.
> Ni más… ni menos.

> Porque incluso cuando crees tener el control…
sigues siguiendo las reglas. 😈.`)
    }
    const realIndex = total - index
    user.warnings.splice(realIndex, 1)
    await client.reply(m.chat, `> 𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎Listo…
> La advertencia del usuario… ha desaparecido. 
> #${index} Como si nunca hubiera existido… 
> @${targetId.split('@')[0]} (${name}) 

> Pero ya sabes…
> algunas cosas… no se borran tan fácilmente 😈.`, m, { mentions: [targetId] })
  },
}