import fs from 'fs';
import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath } from 'url'

global.owner = ['5493863402551', '5493863447787']
global.botNumber = ''

global.sessionName = 'Sessions/Owner'
global.version = '^2.0 - Latest'
global.dev = "Love With By Adara"
global.links = {
api: 'https://api.stellarwa.xyz',
github: "https://github.com/jadeadaralove1/Nanno",
}
global.whatsappChannel = "https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A?source=bot";
global.my = {
ch: '120363374826926142@newsletter',
name: 'NANNOBOT',
}

global.mess = {
socket: '𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎ Este comando solo puede ser ejecutado por un Socket.',
admin: '𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎ Este comando solo puede ser ejecutado por los Administradores del Grupo.',
botAdmin: '𐄹 ۪ ׁ ⚠️ᩚ̼ 𖹭̫ ▎ Este comando solo puede ser ejecutado si el Socket es Administrador del Grupo.'
}

global.APIs = {
adonix: { url: "https://api-adonix.ultraplus.click", key: "Yuki-WaBot" },
vreden: { url: "https://api.vreden.web.id", key: null },
nekolabs: { url: "https://api.nekolabs.web.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
ootaizumi: { url: "https://api.ootaizumi.web.id", key: null },
stellar: { url: "https://api.stellarwa.xyz", key: "YukiWaBot" },
apifaa: { url: "https://api-faa.my.id", key: null },
xyro: { url: "https://api.xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  import(`${file}?update=${Date.now()}`)
})