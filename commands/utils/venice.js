import axios from "axios"

export default {
  command: ["venice","veniceai"],
  tags: ["ia"],
  help: ["venice"],
  group: true,

  run: async (m, ctx) => {

    const conn = ctx.conn || ctx.sock || ctx.client || ctx.bot || global.conn
    const text = ctx.text

    if (!conn) throw "No se encontró conexión del bot"

    const query = text || (m.quoted && m.quoted.text)

    if (!query) {
      return conn.sendMessage(m.chat,{
        text:"❌ Ingresa una pregunta.\nEjemplo:\n.venice ¿Qué es la inteligencia artificial?"
      })
    }

    try {

      await conn.sendMessage(m.chat,{
        react:{ text:"⏳", key:m.key }
      })

      const { data } = await axios.post(
        "https://outerface.venice.ai/api/inference/chat",
        {
          requestId:"mifinfinity",
          modelId:"dolphin-3.0-mistral-24b",
          prompt:[{ content:query, role:"user"}],
          temperature:0.8,
          webEnabled:true
        },
        {
          headers:{ "content-type":"application/json" }
        }
      )

      const result = data
        .split("\n")
        .filter(v=>v.trim())
        .map(v=>JSON.parse(v).content)
        .join("")

      await conn.sendMessage(m.chat,{
        text:`🧠 Venice AI\n\n${result}`
      })

      await conn.sendMessage(m.chat,{
        react:{ text:"✅", key:m.key }
      })

    } catch(e){

      await conn.sendMessage(m.chat,{
        react:{ text:"❎", key:m.key }
      })

      await conn.sendMessage(m.chat,{
        text:`Error:\n${e.message}`
      })

    }
  }
}