import axios from 'axios'
import FormData from 'form-data'

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

function generateUniqueFilename(mime) {
  const ext = mime.includes('/') ? mime.split('/')[1] : 'bin'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const id = Array.from({ length: 8 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `${id}.${ext}`
}

async function uploadToCatbox(buffer, mime) {
  const form = new FormData()
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', buffer, {
    filename: generateUniqueFilename(mime)
  })

  const res = await axios.post('https://catbox.moe/user/api.php', form, {
    headers: form.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })

  if (!res.data || typeof res.data !== 'string' || !res.data.startsWith('https://')) {
    throw new Error('Catbox inválido')
  }

  return res.data.trim()
}

async function uploadToAdonix(buffer, mime) {
  const filename = generateUniqueFilename(mime)
  const base64Content = buffer.toString('base64')

  const res = await axios.post('https://adofiles.i11.eu/api/upload', {
    filename,
    data: base64Content
  }, {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'Ado&'
    }
  })

  if (!res.data?.files?.length) {
    throw new Error('Adonix inválido')
  }

  return res.data.files[0].publicUrl
}

export default {
  command: ['tourl'],
  category: 'utils',

  run: async (client, m, args, usedPrefix, command) => {
    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''

    if (!mime) {
      return client.reply(
        m.chat,
        `ूᰍ ֔ ⠾ 💉 Responde a una imagen o video con *${usedPrefix + command}*`,
        m
      )
    }

    try {
      const media = await q.download()
      let link
      let server = ''

      try {
        link = await uploadToCatbox(media, mime)
        server = 'Catbox'
      } catch {
        link = await uploadToAdonix(media, mime)
        server = 'Adonix'
      }

      const userName = global.db.data.users[m.sender]?.name || 'Usuario'

      const txt =
        `ूᰍ ֔ ⠾ 💉 *Upload Success*\n\n` +
        `ׅ> *URL ›* ${link}\n` +
        `ׅ> *Servidor ›* ${server}\n` +
        `ׅ> *Peso ›* ${formatBytes(media.length)}\n` +
        `ׅ> *Solicitado por ›* ${userName}`

      await client.reply(m.chat, txt, m)

    } catch (e) {
      console.error(e)
      await m.reply(`ूᰍ ֔ ⠾ 💉 Fail: ${e.message}`)
    }
  }
}