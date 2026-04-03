export default {
  command: ['cuentasoficiales'],
  exp: 35,

  run: async function(m, ctx) {  // ctx contiene conn
    try {
      const media = 'https://files.catbox.moe/lcn1kw.mp4';
      const text = `🌑⚔️ BIENVENIDO(A) A LAS CUENTAS OFICIALES ⚔️🌑 ...`;

      await ctx.conn.sendMessage(m.chat, {
        video: { url: media },
        caption: text,
        gifPlayback: true
      }, { quoted: m });

    } catch (error) {
      console.error('Error en cuentasoficiales:', error);
      if (ctx?.conn) { // previene crash si conn sigue undefined
        await ctx.conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al ejecutar el comando.' }, { quoted: m });
      }
    }
  }
}