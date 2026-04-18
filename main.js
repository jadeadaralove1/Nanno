import ws from 'ws'
import moment from 'moment'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import gradient from 'gradient-string'
import seeCommands from './lib/system/commandLoader.js'
import initDB from './lib/system/initDB.js'
import antilink from './commands/antilink.js'
import level from './commands/level.js'
import { getGroupAdmins } from './lib/message.js'

seeCommands()

export default async (client, m) => {
if (!m.message) return

const sender = m.sender

let body =
m.message.conversation ||
m.message.extendedTextMessage?.text ||
m.message.imageMessage?.caption ||
m.message.videoMessage?.caption ||
m.message.buttonsResponseMessage?.selectedButtonId ||
m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
m.message.templateButtonReplyMessage?.selectedId ||
''

const chat = global.db.data.chats[m.chat] ||= {}

if (chat.reacciones === undefined) chat.reacciones = true

if (!m.fromMem && body && chat.reacciones) {

const palabras = /(bot|nanno|Bot|Robot|ia|Six seven|sixseven|botsito|:v)/gi

const reaccionRandom = Math.random() < 0.01

if (body.match(palabras) || reaccionRandom) {

const emojis = [
"😺","😸","😹","😻","😼","😽","🙀","😿","😾",
"😏","😳","🐢","🤯","😱","😨","🤫","🫡","🤧",
"🤖","👑","🐋","🐈","💗","⚡️","🧚‍♀️","🫂",
"🍓","🎈","💤","🌟","💋","👀","🔥","💘"
]

const emot = emojis[Math.floor(Math.random() * emojis.length)]

await client.sendMessage(m.chat, {
react: { text: emot, key: m.key }
})
}

}

initDB(m, client)
antilink(client, m)

for (const name in global.plugins) {
const plugin = global.plugins[name]
if (plugin && typeof plugin.all === "function") {
try {
await plugin.all.call(client, m, { client })
} catch (err) {
console.error(`Error en plugin.all -> ${name}`, err)
}
}
}

const from = m.key.remoteJid
const botJid = (client.user.id.split(':')[0] + '@s.whatsapp.net') || client.user.lid

const settings = global.db.data.settings[botJid] || {}
const user = global.db.data.users[sender] ||= {}
const users = chat.users?.[sender] || {}

const rawBotname = settings.namebot || 'Nanno'
const tipo = settings.type || 'Sub'

const isValidBotname = /^[\w\s]+$/.test(rawBotname)
const namebot = isValidBotname ? rawBotname : 'Nanno'

const shortForms = [
namebot.charAt(0),
namebot.split(" ")[0],
tipo.split(" ")[0],
namebot.split(" ")[0].slice(0, 2),
namebot.split(" ")[0].slice(0, 3)
]

const prefixes = shortForms.map(name => `${name}`)
prefixes.unshift(namebot)

let prefix

if (Array.isArray(settings.prefix) || typeof settings.prefix === 'string') {
const prefixArray = Array.isArray(settings.prefix) ? settings.prefix : [settings.prefix]

prefix = new RegExp(
'^(' + prefixes.join('|') + ')?(' +
prefixArray.map(p => p.replace(/[|\\{}()[\]^$+?.-]/g, '\\$&')).join('|') +
')',
'i'
)

} else if (settings.prefix === true) {
prefix = new RegExp('^', 'i')
} else {
prefix = new RegExp('^(' + prefixes.join('|') + ')?', 'i')
}

const strRegex = (str) => str.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')

let pluginPrefix = client.prefix ? client.prefix : prefix

let inputText = m.text || body || ''

let matchs = pluginPrefix instanceof RegExp
  ? [[pluginPrefix.exec(inputText), pluginPrefix]]
  : Array.isArray(pluginPrefix)
  ? pluginPrefix.map(p => {
      let regex = p instanceof RegExp ? p : new RegExp(strRegex(p))
      return [regex.exec(inputText), regex]
    })
  : [[new RegExp(strRegex(pluginPrefix)).exec(inputText), new RegExp(strRegex(pluginPrefix))]]
: Array.isArray(pluginPrefix)
? pluginPrefix.map(p => {
let regex = p instanceof RegExp ? p : new RegExp(strRegex(p))
return [regex.exec(m.text), regex]
})
: [[new RegExp(strRegex(pluginPrefix)).exec(m.text), new RegExp(strRegex(pluginPrefix))]]

const text = m.text || body || ''

let match = matchs.find(p => {
  try {
    return p[1]?.test?.(text)
  } catch {
    return false
  }
})

for (const name in global.plugins) {
const plugin = global.plugins[name]
if (!plugin) continue
if (plugin.disabled) continue

if (typeof plugin.before === "function") {
try {
if (await plugin.before.call(client, m, { client })) continue
} catch (err) {
console.error(`Error en plugin.before -> ${name}`, err)
}
}
}

if (!match || !match[0]) return

let usedPrefix = (match[0] || [])[0] || ''
let args = m.text.slice(usedPrefix.length).trim().split(" ")
let command = (args.shift() || '').toLowerCase()
let text = args.join(' ')

const pushname = m.pushName || 'Sin nombre'

let groupMetadata = null
let groupAdmins = []
let groupName = ''

if (m.isGroup) {
groupMetadata = await client.groupMetadata(m.chat).catch(() => null)
groupName = groupMetadata?.subject || ''
groupAdmins = groupMetadata?.participants?.filter(p =>
p.admin === 'admin' || p.admin === 'superadmin'
) || []
}

const isAdmins = m.isGroup
? groupAdmins.some(p => (p.id || p.jid) === sender)
: false

const chatData = global.db.data.chats[from]

if (chatData?.primaryBot === botJid || !chatData?.primaryBot) {

const h = chalk.bold.blue('╭────────────────────────────···')
const t = chalk.bold.blue('╰────────────────────────────···')
const v = chalk.bold.blue('│')

console.log(
`${h}
${chalk.yellow(`${v} Fecha: ${moment().format('DD/MM/YY HH:mm:ss')}`)}
${chalk.blueBright(`${v} Usuario: ${pushname}`)}
${chalk.magentaBright(`${v} Remitente: ${sender}`)}
${m.isGroup
? chalk.cyanBright(`${v} Grupo: ${groupName}\n${v} ID: ${from}\n`)
: chalk.greenBright(`${v} Chat privado\n`)
}${t}`
)

}

if (!command) return

const cmdData = global.comandos.get(command)
if (!cmdData) return

try {
await cmdData.run(client, m, args, usedPrefix, command, text)
} catch (error) {
await client.sendMessage(m.chat, {
text: `⚠️ Error al ejecutar comando\n${error}`
}, { quoted: m })
}

level(m)
}