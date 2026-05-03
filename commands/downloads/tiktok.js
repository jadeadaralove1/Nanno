import fetch from 'node-fetch';

export default {
  command: ['tiktok', 'tt', 'tiktoksearch', 'ttsearch', 'tts'],
  category: 'downloader',

  run: async (client, m, args, usedPrefix, command) => {

    if (!args.length) {
      return m.reply('𐄹 ۪ ׁ 🥌ᩚ̼ ▎ Ingresa un término o enlace de TikTok.')
    }

    const text = args.join(" ")
    const isUrl = /tiktok\.com\/[^\s]+/i.test(text)

    try {

      // ==============================
      // 📥 DESCARGA
      // ==============================
      if (isUrl) {

        const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(text)}&hd=1`)
        const json = await res.json()

        if (!json?.data?.play) {
          return m.reply('𐄹 ▎ No se pudo obtener el video.')
        }

        const d = json.data

        const caption = `᪤ 🍒 TIKTOK

⌗ Título:
> ${d.title || 'Sin título'}

⌗ Autor:
> ${d.author?.nickname || 'Desconocido'}

⌗ Duración:
> ${d.duration || 'N/A'}

⌗ Likes:
> ${(d.digg_count || 0).toLocaleString()}`

        return await client.sendMessage(m.chat, {
          video: { url: d.play },
          caption
        }, { quoted: m })
      }

      // ==============================
      // 🔎 BÚSQUEDA
      // ==============================
      const endpoint = `${global.APIs.stellar.url}/search/tiktok?query=${encodeURIComponent(text)}&key=${global.APIs.stellar.key}`

      const res = await fetch(endpoint)
      const json = await res.json()

      const rawData =
        json?.data?.data ||
        json?.data?.videos ||
        json?.data ||
        json?.result ||
        []

      if (!Array.isArray(rawData) || !rawData.length) {
        return m.reply('𐄹 ▎ No hay resultados.')
      }

      const results = rawData.slice(0, 5)
      const medias = []

      for (const v of results) {

        const tiktokUrl = v.url || v.link || v.share_url
        if (!tiktokUrl) continue

        try {

          const dl = await fetch(
            `https://tikwm.com/api/?url=${encodeURIComponent(tiktokUrl)}&hd=1`
          )

          const dlJson = await dl.json()

          const videoUrl = dlJson?.data?.play
          if (!videoUrl) continue

          medias.push({
            type: 'video',
            data: { url: videoUrl },
            caption: `𓋜 TIKTOK\n\n${v.title || 'Sin título'}`
          })

        } catch {}
      }

      if (!medias.length) {
        return m.reply('𐄹 ▎ No se pudieron procesar los videos.')
      }

      await client.sendAlbumMessage(m.chat, medias, { quoted: m })

    } catch (e) {
      await m.reply(`Error en ${usedPrefix + command}\n${e.message}`)
    }
  }
}