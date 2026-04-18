import fetch from 'node-fetch'
import { proto } from '@whiskeysockets/baileys'
import chalk from 'chalk'

export default async (client, m) => {

  client.ev.on('group-participants.update', async (anu) => {
    try {

      const metadata = await client.groupMetadata(anu.id).catch(() => null)
      if (!metadata) return

      const groupAdmins =
        metadata?.participants?.filter(p =>
          p.admin === 'admin' || p.admin === 'superadmin'
        ) || []

      const chat = global?.db?.data?.chats?.[anu.id]
      const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
      const primaryBotId = chat?.primaryBot

      const memberCount = metadata?.participants?.length || 0

      const isSelf = global?.db?.data?.settings?.[botId]?.self ?? false
      if (isSelf) return

      for (const p of anu.participants) {

        const jid = p
        const phone = jid.split('@')[0]

        const pp = await client.profilePictureUrl(jid, 'image')
          .catch(_ => 'https://cdn.yuki-wabot.my.id/files/2PVh.jpeg')

        const mensajes = {
          add: chat?.sWelcome
            ? `\n┊➤ ${chat.sWelcome
              .replace(/{usuario}/g, `@${phone}`)
              .replace(/{grupo}/g, `*${metadata.subject}*`)
              .replace(/{desc}/g, metadata?.desc || '✿ Sin Desc ✿')}`
            : '',

          remove: chat?.sGoodbye
            ? `\n┊➤ ${chat.sGoodbye
              .replace(/{usuario}/g, `@${phone}`)
              .replace(/{grupo}/g, `*${metadata.subject}*`)
              .replace(/{desc}/g, metadata?.desc || '✿ Sin Desc ✿')}`
            : '',

          leave: chat?.sGoodbye
            ? `\n┊➤ ${chat.sGoodbye
              .replace(/{usuario}/g, `@${phone}`)
              .replace(/{grupo}/g, `*${metadata.subject}*`)
              .replace(/{desc}/g, metadata?.desc || '✿ Sin Desc ✿')}`
            : ''
        }

        const fakeContext = {
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: global.db.data.settings?.[botId]?.id,
              serverMessageId: '0',
              newsletterName: global.db.data.settings?.[botId]?.nameid
            },
            externalAdReply: {
              title: global.db.data.settings?.[botId]?.namebot,
              body: global.db.data.settings?.[botId]?.dev,
              mediaUrl: null,
              description: null,
              previewType: 'PHOTO',
              thumbnailUrl: global.db.data.settings?.[botId]?.icon,
              sourceUrl: global.db.data.settings?.[botId]?.link,
              mediaType: 1,
              renderLargerThumbnail: false
            },
            mentionedJid: [jid]
          }
        }

        if (anu.action === 'add' && chat?.welcome && (!primaryBotId || primaryBotId === botId)) {

          const caption = `
                 ㅤ꯭𝗪꯭𝗘꯭𝗟꯭𝗖꯭𝗢꯭𝗠꯭𝗘꯭

             𝕋𝕆   𝕋ℍ𝔼  &  𝔾ℝ𝕆𝕌ℙ

> ⠾ 🥿  Hi, Soy nanno la Chica Nueva.

> ⠾ 🪦  Bienvenido.

──────────────────

*@${phone}*

> Ahora somos ${memberCount} miembros.
${mensajes[anu.action] || ''}
`

          await client.sendMessage(anu.id, {
            image: { url: pp },
            caption,
            mentions: [jid],
            ...fakeContext
          })
        }

        if ((anu.action === 'remove' || anu.action === 'leave') && chat?.goodbye && (!primaryBotId || primaryBotId === botId)) {

          const caption = `
╭┈───◯
┊「 Hasta pronto 」
┊ Nombre › @${phone}
┊ Grupo › ${metadata.subject}
┊ Ahora somos ${memberCount} miembros.
┊ ${mensajes[anu.action] || ''}
╰──────────────
`

          await client.sendMessage(anu.id, {
            image: { url: pp },
            caption,
            mentions: [jid],
            ...fakeContext
          })
        }

        if (anu.action === 'promote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author
          await client.sendMessage(anu.id, {
            text: `@${phone} fue promovido por @${usuario.split('@')[0]}`,
            mentions: [jid, usuario, ...groupAdmins.map(v => v.id)]
          })
        }

        if (anu.action === 'demote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author
          await client.sendMessage(anu.id, {
            text: `@${phone} fue degradado por @${usuario.split('@')[0]}`,
            mentions: [jid, usuario, ...groupAdmins.map(v => v.id)]
          })
        }
      }

    } catch (err) {
      console.log(chalk.gray(`[ BOT ] → ${err}`))
    }
  })

  client.ev.on('messages.upsert', async ({ messages }) => {

    const m = messages[0]
    if (!m?.messageStubType) return

    const id = m.key.remoteJid
    const chat = global.db.data.chats[id]

    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const primaryBotId = chat?.primaryBot

    if (!chat?.alerts || (primaryBotId && primaryBotId !== botId)) return

    const isSelf = global.db.data.settings?.[botId]?.self ?? false
    if (isSelf) return

    const actor = m.key?.participant || m.participant || m.key?.remoteJid
    if (!actor) return

    const phone = actor.split('@')[0]

    const groupMetadata = await client.groupMetadata(id).catch(() => null)
    const groupAdmins =
      groupMetadata?.participants?.filter(p =>
        p.admin === 'admin' || p.admin === 'superadmin'
      ) || []

    if (m.messageStubType == 21) {
      await client.sendMessage(id, {
        text: `@${phone} cambió el nombre del grupo`,
        mentions: [actor, ...groupAdmins.map(v => v.id)]
      })
    }

    if (m.messageStubType == 22) {
      await client.sendMessage(id, {
        text: `@${phone} cambió el icono del grupo`,
        mentions: [actor, ...groupAdmins.map(v => v.id)]
      })
    }

    if (m.messageStubType == 23) {
      await client.sendMessage(id, {
        text: `@${phone} restableció el enlace del grupo`,
        mentions: [actor, ...groupAdmins.map(v => v.id)]
      })
    }

    if (m.messageStubType == 24) {
      await client.sendMessage(id, {
        text: `@${phone} cambió la descripción`,
        mentions: [actor, ...groupAdmins.map(v => v.id)]
      })
    }

  })
}