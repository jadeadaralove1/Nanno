import fs from 'fs'
import moment from 'moment'

import seeCommands from './lib/system/commandLoader.js'
import initDB from './lib/system/initDB.js'
import antilink from './commands/antilink.js'
import level from './commands/level.js'

seeCommands()

export default async (client, m) => {
if (!m.message) return

const sender = m.sender
const from = m.key.remoteJid

const text =
m.message.conversation ||
m.message.extendedTextMessage?.text ||
m.message.imageMessage?.caption ||
m.message.videoMessage?.caption ||
m.message.buttonsResponseMessage?.selectedButtonId ||
m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
m.message.templateButtonReplyMessage?.selectedId ||
''

/* ================= INIT ================= */
initDB(m, client)
antilink(client, m)

/* ================= DEBUG (IMPORTANTE) ================= */
const DEBUG = true
const log = (...a) => DEBUG && console.log('[BOT]', ...a)

/* ================= SETTINGS ================= */
const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
const chat = global.db.data.chats[from] ||= {}
const settings = global.db.data.settings[botJid] ||= {}
const user = global.db.data.users[sender] ||= {}

const namebot = settings.namebot || 'Yuki'

/* ================= PREFIX SIMPLE & ROBUSTO ================= */
const prefixes = [
namebot,
namebot.charAt(0),
(namebot.split(' ')[0] || ''),
'!',
'.',
'/'
]

const prefixRegex = new RegExp(
'^(' + prefixes.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')',
'i'
)

const match = text.match(prefixRegex)

if (!match) {
log('❌ Sin prefix:', text)
return
}

const usedPrefix = match[0]
const raw = text.slice(usedPrefix.length).trim()
const args = raw.split(/\s+/)

const command = (args.shift() || '').toLowerCase()
const body = args.join(' ')

log('✔ comando detectado:', command)

/* ================= COMMAND EMPTY ================= */
if (!command) {
log('❌ comando vacío')
return
}

/* ================= PRIMARY BOT BLOCK FIXED ================= */
if (chat.primaryBot && chat.primaryBot !== botJid) {
log('⚠ primaryBot bloquea ejecución:', chat.primaryBot)
return
}

/* ================= GROUP INFO SAFE ================= */
let isAdmins = false
let isBotAdmins = false

if (m.isGroup) {
try {
const metadata = await client.groupMetadata(from)
const participants = metadata?.participants || []

const admins = participants.filter(p => p.admin)

isAdmins = admins.some(p => p.id === sender)
isBotAdmins = admins.some(p => p.id === botJid)

} catch (e) {
log('⚠ error groupMetadata:', e.message)
}
}

/* ================= COMMAND LOADER ================= */
const cmdData = global.comandos.get(command)

if (!cmdData) {
log('❌ comando no registrado:', command)
return m.reply?.(`⚠ El comando *${command}* no existe.`)
}

/* ================= PERMISSIONS ================= */
if (cmdData.isOwner && !global.owner.includes(sender.split('@')[0])) {
log('⛔ owner requerido')
return
}

if (cmdData.isAdmin && !isAdmins) {
log('⛔ admin requerido')
return m.reply?.('⚠ Solo administradores')
}

if (cmdData.botAdmin && !isBotAdmins) {
log('⛔ bot admin requerido')
return m.reply?.('⚠ Necesito ser admin')
}

/* ================= EXECUTION ================= */
try {
await client.readMessages([m.key])

user.usedcommands = (user.usedcommands || 0) + 1

log('🚀 ejecutando:', command)

await cmdData.run(client, m, args, usedPrefix, command, body)

level(m)

} catch (e) {
console.log('❌ ERROR CMD:', command, e)

await client.sendMessage(from, {
text: '❌ Error ejecutando comando:\n' + e.message
}, { quoted: m })
}
}