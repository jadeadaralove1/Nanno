import fetch from 'node-fetch'

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export default {
  command: ['tiktok', 'tt', 'tiktoksearch', 'ttsearch', 'tts'],
  category: 'downloader',

  run: async (client, m, args, usedPrefix, command) => {
    if (!args.length) {
      return m.reply('《✧》 Ingresa búsqueda o link.')
    }

    const text = args.join(" ")
    const isUrl = /tiktok\.com\/[^\s]+/i.test(text)

    const endpoint = isUrl
      ? `${global.APIs.stellar.url}/dl/tiktok?url=${encodeURIComponent(text)}&key=${global.APIs.stellar.key}`
      : `${global.APIs.stellar.url}/search/tiktok?query=${encodeURIComponent(text)}&key=${global.APIs.stellar.key}`

    try {

      const res = await fetch(endpoint)
      const json = await res.json()

      if (!json?.status) {
        return m.reply('《✧》 Sin resultados.')
      }

      // =========================
      // 📥 DESCARGA DIRECTA
      // =========================
      if (isUrl) {

        const d = json.data
        const url = Array.isArray(d.dl) ? d.dl[0] : d.dl

        return await client.sendMessage(m.chat, {
          video: { url },
          caption: `𓋜 TIKTOK\n\n${d.title || 'Sin título'}`
        }, { quoted: m })
      }

      // =========================
      // 🔎 BÚSQUEDA → 10 VIDEOS
      // =========================

      const results = (json.data || []).slice(0, 10)

      if (!results.length) {
        return m.reply('《✧》 No se encontraron videos.')
      }

      const medias = []

      for (const v of results) {

        if (!v?.url) continue

        try {
          await sleep(1000) // 🔥 anti rate-limit

          const dl = await fetch(
            `https://tikwm.com/api/?url=${encodeURIComponent(v.url)}&hd=1`
          )

          const j = await dl.json()

          const videoUrl = j?.data?.play
          if (!videoUrl) continue

          medias.push({
            type: 'video',
            data: { url: videoUrl },
            caption: `𓋜 TIKTOK

⌗ ${v.title || 'Sin título'}
⌗ ${v.author?.nickname || 'Desconocido'}`
          })

        } catch {}
      }

      if (!medias.length) {
        return m.reply('《✧》 No se pudieron cargar los videos.')
      }

      await client.sendAlbumMessage(m.chat, medias, { quoted: m })

    } catch (e) {
      return m.reply(`Error:\n${e.message}`)
    }
  }
}