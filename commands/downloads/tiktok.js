import fetch from 'node-fetch'

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export default {
  command: ['tiktok', 'tt', 'tiktoksearch', 'ttsearch', 'tts'],
  category: 'downloader',

  run: async (client, m, args, usedPrefix, command) => {
    if (!args.length) {
      return m.reply('𐄹 ۪ ׁ 🥌 ▎ Ingresa un término o enlace de TikTok.')
    }

    const text = args.join(" ")
    const isUrl = /(?:https?:\/\/)?(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i.test(text)

    try {

      // =========================
      // 📥 DESCARGA
      // =========================
      if (isUrl) {

        const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(text)}&hd=1`)
        const json = await res.json()

        if (!json?.data?.play) {
          return m.reply('𐄹 ▎ No se pudo obtener el video.')
        }

        const d = json.data

        return await client.sendMessage(m.chat, {
          video: { url: d.play },
          caption: `𓋜 TIKTOK

⌗ Título:
> ${d.title || 'Sin título'}

⌗ Autor:
> ${d.author?.nickname || 'Desconocido'}

⌗ Likes:
> ${(d.digg_count || 0).toLocaleString()}`
        }, { quoted: m })
      }

      // =========================
      // 🔎 BÚSQUEDA
      // =========================
      const endpoint = `${global.APIs.stellar.url}/search/tiktok?query=${encodeURIComponent(text)}&key=${global.APIs.stellar.key}`

      const res = await fetch(endpoint)
      const json = await res.json()

      if (!json?.status || !Array.isArray(json?.data)) {
        return m.reply('𐄹 ▎ Sin resultados.')
      }

      // 🔥 LIMITAMOS A 3 (importante)
      const results = json.data.slice(0, 3)

      const medias = []

      for (const v of results) {

        if (!v?.url) continue

        try {
          // 🧠 delay anti-rate-limit
          await sleep(1200)

          const dl = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(v.url)}&hd=1`)
          const j = await dl.json()

          if (!j?.data?.play) continue

          medias.push({
            type: 'video',
            data: { url: j.data.play },
            caption: `𓋜 TIKTOK

⌗ Título:
> ${v.title || 'Sin título'}

⌗ Likes:
> ${(v.stats?.likes || 0).toLocaleString()}`
          })

        } catch {
          continue
        }
      }

      if (!medias.length) {
        return m.reply('𐄹 ▎ No se pudieron procesar los videos.')
      }

      await client.sendAlbumMessage(m.chat, medias, { quoted: m })

    } catch (e) {
      return m.reply(`Error en ${usedPrefix + command}\n${e.message}`)
    }
  }
}