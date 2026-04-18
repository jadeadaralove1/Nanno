export default {
  command: ['formarpareja', 'formarparejas'],
  tags: ['fun'],
  help: ['formarpareja'],
  group: true,
  register: true,

  run: async (conn, m, args) => {

    const toM = (a) => '@' + a.split('@')[0];

    // Canal newsletter
    global.settings = global.settings || {};
    settings.id ??= '120363406529946290@newsletter';

    // Obtener metadata del grupo
    let metadata;
    try {
      metadata = await conn.groupMetadata(m.chat);
    } catch (e) {
      return conn.sendMessage(
        m.chat,
        { text: '◜࣭࣭࣭࣭࣭᷼⚠️̸̷ׁᮬᰰᩫ࣭࣭࣭࣭ No se pudo obtener la información del grupo.' },
        { quoted: m }
      );
    }

    const participantes = metadata.participants.map(p => p.id);

    if (participantes.length < 2) {
      return conn.sendMessage(
        m.chat,
        { text: '◜࣭࣭࣭࣭࣭᷼⚠️̸̷ׁᮬᰰᩫ࣭࣭࣭࣭ Necesitan al menos 2 personas en el grupo.' },
        { quoted: m }
      );
    }

    // Elegir 2 al azar
    const a = participantes[Math.floor(Math.random() * participantes.length)];
    let b;

    do {
      b = participantes[Math.floor(Math.random() * participantes.length)];
    } while (b === a);

    const texto = `♡ㅤㅤ╱ㅤㅤㅤ\`𝗠𝗔𝗖𝗛\`ㅤ𝆶ㅤㅤ\`💗\`ㅤㅤ❜

         ${toM(a)} 💍 ${toM(b)}

> Deberían casarse... hacen linda pareja`;

    await conn.sendMessage(
      m.chat,
      {
        text: texto,
        mentions: [a, b],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: settings.id,
            newsletterName: 'Mi Canal',
            serverMessageId: 1
          }
        }
      },
      { quoted: m }
    );
  }
};