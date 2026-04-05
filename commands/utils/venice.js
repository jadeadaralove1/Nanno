import axios from "axios"

export default {
  command: ["venice","veniceai"],
  tags: ["ia"],
  help: ["venice"],
  group: true,

  run: async (m, { text }) => {

    const query = text || (m.quoted && m.quoted.text)

    if (!query) {
      return m.reply("❌ Ingresa una pregunta.\nEjemplo:\n.venice ¿Qué es la inteligencia artificial?")
    }

    try {

      m.reply("⏳ Pensando...")

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

      m.reply(`🧠 *Venice AI*\n\n${result}`)

    } catch(e){

      console.error(e)

      m.reply(`❌ Error:\n${e.message}`)

    }
  }
}