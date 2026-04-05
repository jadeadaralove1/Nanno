import axios from "axios"
import fetch from "node-fetch"

export default {
  command: ["venice","veniceai"],
  tags: ["ia"],
  help: ["venice"],
  group: true,

  run: async (m, { text }) => {

    const conn = m.conn

    if (!conn) throw new Error("Conexión del bot no encontrada")

    const query = text || (m.quoted && m.quoted.text)

    if (!query) {
      await conn.sendMessage(m.chat,{
        react:{ text:"❌", key:m.key }
      })

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
          headers:{
            "content-type":"application/json"
          }
        }
      )

      const result = data
        .split("\n")
        .filter(v=>v.trim())
        .map(v=>JSON.parse(v).content)
        .join("")

      await conn.sendMessage(m.chat,{
        text:`🧠 *Venice AI*\n\n${result}`
      })

      await conn.sendMessage(m.chat,{
        react:{ text:"✅", key:m.key }
      })

    } catch(err){

      console.log(err)

      await conn.sendMessage(m.chat,{
        react:{ text:"❎", key:m.key }
      })

      await conn.sendMessage(m.chat,{
        text:`❌ Error:\n${err.message}`
      })
    }

  }
}