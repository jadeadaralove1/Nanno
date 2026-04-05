import axios from "axios";
import fetch from "node-fetch";

export default {
  command: ["venice", "veniceai"],
  tags: ["ia"],
  help: ["venice"],
  group: true,

  run: async (m, { conn, text }) => {

    const ctxErr = global.rcanalx || {};
    const ctxWarn = global.rcanalw || {};
    const ctxOk = global.rcanalr || {};

    const query = text || (m.quoted && m.quoted.text);

    if (!query) {
      await conn.sendMessage(m.chat, {
        react: { text: "❌", key: m.key }
      });

      return conn.reply(
        m.chat,
        "❌ Ingresa una pregunta.\nEjemplo: .venice ¿Qué es la inteligencia artificial?",
        m,
        ctxWarn
      );
    }

    try {

      await conn.sendMessage(m.chat, {
        react: { text: "⏳", key: m.key }
      });

      const { data } = await axios.request({
        method: "POST",
        url: "https://outerface.venice.ai/api/inference/chat",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
          origin: "https://venice.ai",
          referer: "https://venice.ai/",
          "user-agent": "Mozilla/5.0",
          "x-venice-version": "interface@20250523.214528+393d253"
        },
        data: JSON.stringify({
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
        })
      });

      const chunks = data
        .split("\n")
        .filter(v => v.trim() !== "")
        .map(v => JSON.parse(v));

      const result = chunks.map(v => v.content).join("");

      if (!result) throw new Error("No hubo respuesta de Venice AI");

      const fkontak = {
        key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
        message: {
          locationMessage: {
            name: "👑 Venice *pro*",
            jpegThumbnail: await (await fetch("https://files.catbox.moe/5mgsc8.jpg")).buffer(),
            vcard:
`BEGIN:VCARD
VERSION:3.0
N:;Venice;;;
FN:Venice AI
ORG:Outerface
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:IA
X-WA-BIZ-DESCRIPTION:Respuestas inteligentes con estilo sombrío
X-WA-BIZ-NAME:Venice AI
END:VCARD`
          }
        },
        participant: "0@s.whatsapp.net"
      };

      await conn.sendMessage(
        m.chat,
        { text: `🧠 *Venice AI:*\n${result}` },
        { quoted: fkontak }
      );

      await conn.sendMessage(m.chat, {
        react: { text: "✅", key: m.key }
      });

    } catch (err) {

      console.error("Error Venice:", err.message);

      await conn.sendMessage(m.chat, {
        react: { text: "❎", key: m.key }
      });

      await conn.reply(
        m.chat,
        `❌ Error: ${err.message}`,
        m,
        ctxErr
      );
    }
  }
};