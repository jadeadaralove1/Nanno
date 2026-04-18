import fs from 'fs'
import moment from 'moment'

import seeCommands from './lib/system/commandLoader.js'
import initDB from './lib/system/initDB.js'
import antilink from './commands/antilink.js'
import level from './commands/level.js'

seeCommands()

export default async (client, m) => {
if (!m.message) return

/* ================= MESSAGE PARSER PRO ================= */
const msg = m.message

const text = (
msg?.conversation ||
msg?.extendedTextMessage?.text ||
msg?.imageMessage?.caption ||
msg?.videoMessage?.caption ||
msg?.documentMessage?.caption ||
msg?.buttonsResponseMessage?.selectedButtonId ||
msg?.listResponseMessage?.singleSelectReply?.selectedRowId ||
msg?.templateButtonReplyMessage?.selectedId ||
msg?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation ||
msg?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text ||
msg?.ephemeralMessage?.message?.extendedTextMessage?.text ||
msg?.viewOnceMessage?.message?.conversation ||
msg?.viewOnceMessage?.message?.extendedTextMessage?.text ||
''
).trim()

if (!text) return

/* ================= INIT ================= */
initDB(m, client)
antilink(client, m)

/* ================= DEBUG ================= */
const DEBUG = true
const log = (...a) => DEBUG && console.log('[BOT]', ...a)

/* ================= BASIC INFO ================= */
const sender = m.sender
const from = m.key.remoteJid

const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
const chat = global.db.data.chats[from] ||= {}
const settings = global.db.data.settings[botJid] ||= {}
const user = global.db.data.users[sender] ||= {}

const namebot = settings.namebot || 'Yuki'

/* ================= SIMPLE PREFIX (PRO FIX) ================= */
const prefixes = new Set([
namebot,
namebot.charAt(0),
(namebot.split(' ')[0] || ''),
'!',
'.',
'/',
'#'
])

const prefix = [...prefixes]
.find(p => text.startsWith(p))

if (!prefix) {
if (DEBUG) log('❌ Sin prefix:', text)
return
}

const raw = text.slice(prefix.length).trim()
const args = raw.split(/\s+/)

const command = (args.shift() || '').toLowerCase()
const body = args.join(' ')

if (!command) return

log('✔ comando detectado:', command)

/* ================= PRIMARY BOT ================= */
if (chat.primaryBot && chat.primaryBot !== botJid) {
log('⚠ primaryBot bloquea ejecución')
return
}

/* ================= GROUP INFO FIX ================= */
let isAdmins = false
let isBotAdmins = false

if (m.isGroup) {
try {
const metadata = await client.groupMetadata(from)
const participants = metadata?.participants || []

isAdmins = participants.some(p =>
(p.admin === 'admin' || p.admin === 'superadmin') &&
(p.id || p.jid || p.lid) === sender
)

isBotAdmins = participants.some(p =>
(p.admin === 'admin' || p.admin === 'superadmin') &&
(p.id || p.jid || p.lid) === botJid
)

} catch (e) {
log('⚠ group error:', e.message)
}
}

/* ================= COMMAND ================= */
const cmdData = global.comandos.get(command)

if (!cmdData) return

/* ================= PERMISSIONS ================= */
if (cmdData.isOwner && !global.owner.includes(sender.split('@')[0])) return

if (cmdData.isAdmin && !isAdmins) {
return m.reply?.('⚠ Solo administradores')
}

if (cmdData.botAdmin && !isBotAdmins) {
return m.reply?.('⚠ Necesito ser admin')
}

/* ================= EXECUTION ================= */
try {
await client.readMessages([m.key])

user.usedcommands = (user.usedcommands || 0) + 1

log('🚀 ejecutando:', command)

await cmdData.run(client, m, args, prefix, command, body)

level(m)

} catch (e) {
log('❌ ERROR:', e.message)

await client.sendMessage(from, {
text: '❌ Error:\n' + e.message
}, { quoted: m })
}
}