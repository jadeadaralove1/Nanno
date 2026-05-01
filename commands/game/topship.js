export default {
  command: ['topship'],
  tags: ['fun', 'main'],
  help: ['topship'],
  group: true,
  register: true,

  run: async (conn, m, args) => {
    const toM = (a) => '@' + a.split('@')[0];

    // Canal newsletter
    global.settings = global.settings || {};
    settings.id ??= '120363406529946290@newsletter';

    // Obtener participantes del grupo
    let metadata;
    try {
      metadata = await conn.groupMetadata(m.chat);
    } catch (e) {
      return conn.sendMessage(
        m.chat,
        { text: '⚠️ No se pudo obtener la información del grupo.' },
        { quoted: m }
      );
    }

    let ps = metadata.participants.map(p => p.id);

    if (ps.length < 2) {
      return conn.sendMessage(
        m.chat,
        { text: '⚠️ Necesitan al menos 2 personas en el grupo.' },
        { quoted: m }
      );
    }

    // Mezclar participantes
    ps = ps.sort(() => Math.random() - 0.5);

    // Tomar hasta 10 participantes = 5 parejas
    const parejas = [];
    for (let i = 0; i < Math.min(ps.length, 10); i += 2) {
      if (ps[i + 1]) parejas.push([ps[i], ps[i + 1]]);
    }

    const mensajes = [
      'Destinados a estar juntos 💙',
      'Se miran y se enamoran ✨',
      'Ya parecen familia 🤱🧑‍🍼',
      'Se casaron en secreto 💍',
      'Luna de miel activada 🌙❤️'
    ];

    let texto = `╭━━━〔 💘 𝗧𝗢𝗣  𝗣𝗔𝗥𝗘𝗝𝗔𝗦 💘 〕━━⬮
┃▸ Los más shippeados del grupo
╰━━━━━━━━━━━━━━━━⬮\n\n`;

    parejas.forEach((p, idx) => {
      texto += `💞 *${idx + 1}.* ${toM(p[0])} ✦ ${toM(p[1])}\n`;
      texto += `┃ ${mensajes[idx] || 'Linda pareja 💖'}\n\n`;
    });

    texto += `╭────────────⬮
│ 🩷 ¿Quién sigue?
╰────────────⬮`;

    const mentions = parejas.flat();

    await conn.sendMessage(
      m.chat,
      {
        text: texto,
        mentions,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: settings.id,
            newsletterName: 'Mi Canal',
            serverMessageId: 1
          },
          externalAdReply: {
            title: '💘 Parejas del Grupo',
            body: 'El amor anda en el aire...',
            thumbnailUrl: 'https://files.catbox.moe/7w1n8m.jpg',
            sourceUrl: 'https://whatsapp.com/channel/120363406529946290',
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: false
          }
        }
      },
      { quoted: m }
    );
  }
};