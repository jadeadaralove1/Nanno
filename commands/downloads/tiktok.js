import fetch from 'node-fetch';

export default {
command: ['tiktok', 'tt', 'tiktoksearch', 'ttsearch', 'tts'],
category: 'downloader',
run: async (client, m, args, usedPrefix, command) => {
if (!args.length) {
return m.reply('𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎ Por favor, ingresa un término o enlace de TikTok.')
}

const text = args.join(" ")  
const isUrl = /(?:https?:\/\/)?(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i.test(text)  

try {  

  // ==============================  
  // 📥 DESCARGA (TikWM)  
  // ==============================  
  if (isUrl) {  
    const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(text)}&hd=1`)  
    const json = await res.json()  

    if (!json?.data) {  
      return m.reply('𐄹 ۪ ׁ 🥌ᩚ̼ 𖹭̫ ▎ No se pudo obtener el video.')  
    }  

    const data = json.data  
    const videoUrl = data.play  
    const title = data.title  
    const author = data.author  
    const duration = data.duration  
    const likes = data.digg_count || 0  

    const caption = `᪤  ׅ🍒    ֹ     ઇTIKTOK३  ׅ𓋜ֹֹ

⌗ ⬭ Título:

> ${title || 'Sin título'}



⌗ Autor: ${author?.nickname || 'Desconocido'}

⌗ Duración:

> ${duration || 'N/A'}



⌗ Likes:

> ${likes.toLocaleString()}`



await client.sendMessage(m.chat, {  
      video: { url: videoUrl },  
      caption  
    }, { quoted: m })  

  }   

  // ==============================  
  // 🔎 BÚSQUEDA (Stellar)  
  // ==============================  
  else {  
    const endpoint = `${global.APIs.stellar.url}/search/tiktok?query=${encodeURIComponent(text)}&key=${global.APIs.stellar.key}`  

    const res = await fetch(endpoint)  
    const json = await res.json()  

    if (!json?.status || !json?.data?.length) {  
      return m.reply('𐄹 ۪ ׁ 😺ᩚ̼ 𖹭̫ ▎ No se encontraron resultados.')  
    }  

    const results = json.data.slice(0, 5)  

    const medias = []  

    for (const v of results) {  
      if (!v.url) continue  

      try {  
        // 🔥 cada resultado lo paso por TikWM  
        const dlRes = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(v.url)}&hd=1`)  
        const dlJson = await dlRes.json()  

        const videoUrl = dlJson?.data?.play  
        if (!videoUrl) continue  

        const caption = `᪤  ׅ🍒    ֹ     ઇTIKTOK३  ׅ𓋜ֹֹ

⌗ ⬭ Título:

> ${v.title || 'Sin título'}



⌗ Autor:

> ${v.author?.nickname || 'Desconocido'}



⌗ Likes:

> ${(v.stats?.likes || 0).toLocaleString()}`



medias.push({  
          type: 'video',  
          data: { url: videoUrl },  
          caption  
        })  

      } catch {}  
    }  

    if (!medias.length) {  
      return m.reply('𐄹 ۪ ׁ 😺ᩚ̼ 𖹭̫ ▎ No se pudieron procesar los resultados.')  
    }  

    await client.sendAlbumMessage(m.chat, medias, { quoted: m })  
  }  

} catch (e) {  
  await m.reply(`> Error en *${usedPrefix + command}*\n> ${e.message}`)  
}

},
}
