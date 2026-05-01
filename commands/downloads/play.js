import yts from 'yt-search'
import fetch from 'node-fetch'
import { getBuffer } from '../../lib/message.js'

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url)
async function getVideoInfo(query, videoMatch) {
  const search = await yts(query)
  if (!search.all.length) return null
  const videoInfo = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
  return videoInfo || null
}

export default {
  command: ['play', 'mp3', 'ytmp3', 'ytaudio', 'playaudio'],
  category: 'downloader',
  run: async (client, m, args, usedPrefix, command) => {
    try {
      if (!args[0]) {
        return m.reply('𐄹 ۪ ׁ 😺ᩚ̼ 𖹭̫ ▎Por favor, menciona el nombre o URL del video que deseas descargar')
      }
      const text = args.join(' ')
      const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
      const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
      let url = query, title = null, thumbBuffer = null
      try {
        const videoInfo = await getVideoInfo(query, videoMatch)
        if (videoInfo) {
          url = videoInfo.url
          title = videoInfo.title
          thumbBuffer = await getBuffer(videoInfo.image)
          const vistas = (videoInfo.views || 0).toLocaleString()
          const canal = videoInfo.author?.name || 'Desconocido'
          const infoMessage = 
`     𝄖ㅤ🎧̷頩ㅤ𝅛ㅤㅤN𖩅NNOㅤㅤㅤ❠

> 🔘 :: TÍTULO: ${title}

CANAL: 
> ${canal}

VISTAS: 
> ${vistas}

DURACIÓN: 
> ${videoInfo.timestamp || 'DESCONOCIDO'}

ENLACE:
> ${url}`
          await client.sendMessage(m.chat, { image: thumbBuffer, caption: infoMessage }, { quoted: m })
        }
      } catch (err) {
      }
      const audio = await getAudioFromApis(url)
      if (!audio?.url) {
        return m.reply('𐄹 ۪ ׁ 🤖ᩚ̼ 𖹭̫ ▎ No se pudo descargar el *audio*, intenta más tarde.')
      }
      const audioBuffer = await getBuffer(audio.url)
      await client.sendMessage(m.chat, { audio: audioBuffer, fileName: `${title || 'audio'}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  }
}

async function getAudioFromApis(url) {
  const apis = [
    {
      api: 'Delirius',
      endpoint: `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(url)}`,
      extractor: res => res?.data?.download || res?.data?.url
    },
    {
      api: 'EliteProTech',
      endpoint: `https://eliteprotech-apis.zone.id/ytdown?url=${encodeURIComponent(url)}&format=mp3`,
      extractor: res => res?.result?.download || res?.result?.url
    }
  ]

  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(endpoint, { signal: controller.signal })
        .then(r => r.json())

      clearTimeout(timeout)

      const link = extractor(res)
      if (link) return { url: link, api }

    } catch (e) {
      console.log(`Error con API ${api}:`, e.message)
    }

    await new Promise(resolve => setTimeout(resolve, 500))
  }

  return null
}