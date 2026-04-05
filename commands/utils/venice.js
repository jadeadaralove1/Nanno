import axios from "axios";
import fetch from "node-fetch";

export default {
  command: ["venice", "veniceai"],
  tags: ["ia"],
  help: ["venice"],
  group: true,

  run: async (m, ctx) => {

    const conn = ctx.conn || global.conn
    const text = ctx.text

    const ctxErr = global.rcanalx || {}
    const ctxWarn = global.rcanalw || {}

    const query = text || (m.quoted && m.quoted.text)

    if (!query) {
      await conn.sendMessage(m.chat, {
        react: { text: "❌", key: m.key }
      })

      return conn.reply(
        m.chat,
        "❌ Ingresa una pregunta.\nEjemplo: .venice ¿Qué es la inteligencia artificial?",
        m,
        ctxWarn
      )
    }

    try {

      await conn.sendMessage(m.chat, {
        react: { text: "⏳", key: m.key }
      })

      const { data } = await axios.post(
        "https://outerface.venice.ai/api/inference/chat",
        {
          requestId: "mifinfinity",
          modelId: "dolphin-3.0-mistral-24b",
          prompt: [{ content: query, role: "user" }],
          systemPrompt: "",
          conversationType: "text",
          temperature: 0.8,
          webEnabled: true,
          topP: 0.9,
          isCharacter: false,
          clientProcessingTime: 15
        },
        {
          headers: {
            accept: "*/*",
            "content-type": "application/json",
            origin: "https://venice.ai",
            referer: "https://venice.ai/",
            "user-agent": "Mozilla/5.0",
            "x-venice-version": "interface@20250523.214528+393d253"
          }
        }
      )

      const chunks = data
        .split("\n")
        .filter(v => v.trim() !== "")
        .map(v => JSON.parse(v))

      const result = chunks.map(v => v.content).join("")

      if (!result) throw new Error("No hubo respuesta de Venice AI")

      const thumb = await (await fetch("https://files.catbox.moe/5mgsc8.jpg")).buffer()

      const fkontak = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
        message: {
          locationMessage: {
            name: "👑 Venice *pro*",
            jpegThumbnail: thumb
          }
        },
        participant: "0@s.whatsapp.net"
      }

      await conn.sendMessage(
        m.chat,
        { text: `🧠 *Venice AI:*\n${result}` },
        { quoted: fkontak }
      )

      await conn.sendMessage(m.chat, {
        react: { text: "✅", key: m.key }
      })

    } catch (err) {

      console.error("Error Venice:", err.message)

      await conn.sendMessage(m.chat, {
        react: { text: "❎", key: m.key }
      })

      await conn.reply(
        m.chat,
        `❌ Error: ${err.message}`,
        m,
        ctxErr
      )
    }
  }
}