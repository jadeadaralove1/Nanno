export default {
  command: ['todos', 'invocar', 'tagall'],
  category: 'grupo',
  isAdmin: true,
  run: async (client, m, args) => {
    const groupInfo = await client.groupMetadata(m.chat)
    const participants = groupInfo.participants
    const pesan = args.join(' ')
    let teks = ` ׄ 　۪ 𓂃 ੭୧ Invocación activada… 

Qué dramático todo, invocar gente como si fueras protagonista de un ritual oscuro… me encanta.

> “Han sido llamados… ignoren si quieren, pero ya están dentro.”


${pesan || ''}

⌗ꥑּ͘🪪⃟𐨿ּܼ⏤᩠ Grupo: \`GROUP TAG\`

👥 Miembros: ${participants.length}

📝 Solicitado por: @${m.sender.split('@')[0]}

           𝗟ista de 𝗨suarios  
`;
    for (const mem of participants) {
      teks += `𐄹 ۪ ׁ 😺ᩚ̼ 𖹭̫ ▎ @${mem.id.split('@')[0]}\n`
    }
    teks += `╰⸼ ┄ ┄ ꒰ \`${version}\` ꒱ ┄ ┄⸼`
    return client.reply(m.chat, teks, m, { mentions: [m.sender, ...participants.map(p => p.id)] })
  }
}