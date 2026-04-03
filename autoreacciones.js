export default {
name: "autoreact",

all: async function (m, { client }) {

if (!m.text) return

const texto = m.text.toLowerCase()

const palabras = [
'bot',
'nanno',
'robot',
'ia',
'demitra'
]

const emojis = [
'🤖',
'👀',
'✨',
'😶',
'💬',
'🫠',
'😹',
'🔥'
]

if (palabras.some(p => texto.includes(p))) {

if (Math.random() < 0.5) return

const emoji = emojis[Math.floor(Math.random() * emojis.length)]

await client.sendMessage(m.chat, {
react: { text: emoji, key: m.key }
})

}

}
}