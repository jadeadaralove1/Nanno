import fs from "fs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath } from "url"
import { parse } from "@babel/parser"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

global.comandos = new Map()
global.plugins = {}

const commandsFolder = path.join(__dirname, "../../commands")

async function seeCommands(dir = commandsFolder) {
const items = fs.readdirSync(dir)

for (const fileOrFolder of items) {
const fullPath = path.join(dir, fileOrFolder)

if (fs.lstatSync(fullPath).isDirectory()) {
await seeCommands(fullPath)
continue
}

if (!fileOrFolder.endsWith(".js")) continue

const code = fs.readFileSync(fullPath)

try {
parse(code.toString(), {
sourceType: "module",
plugins: ["topLevelAwait"]
})
} catch (err) {
console.error(chalk.red(`❌ Syntax error ${fileOrFolder}`))
continue
}

try {
const modulePath = `${path.resolve(fullPath)}?v=${Date.now()}`
const mod = await import(modulePath)

const cmd = mod.default

// 🔥 SOLO plugins reales o comandos válidos
if (cmd?.command && typeof cmd.run === "function") {

cmd.command.forEach(c => {
global.comandos.set(c.toLowerCase(), {
run: cmd.run,
category: cmd.category || "uncategorized",
isOwner: cmd.isOwner || false,
isAdmin: cmd.isAdmin || false,
botAdmin: cmd.botAdmin || false,
plugin: fileOrFolder
})
})

} else {
// 🔥 plugins sin formato comando
global.plugins[fileOrFolder.replace(".js", "")] = mod
}

} catch (e) {
console.error(chalk.red(`❌ Error loading ${fileOrFolder}`), e)
}
}
}

globalThis.reload = async (_ev, filename) => {
if (!filename.endsWith(".js")) return

const fullPath = path.join(commandsFolder, filename)

if (!fs.existsSync(fullPath)) {
delete global.plugins[filename.replace(".js", "")]
delete global.comandos
return
}

try {
const mod = await import(`${fullPath}?v=${Date.now()}`)

global.plugins[filename.replace(".js", "")] = mod

global.comandos = new Map()
await seeCommands()

} catch (e) {
console.error("reload error", e)
}
}

fs.watch(commandsFolder, (e, f) => {
if (f) globalThis.reload(e, f)
})

export default seeCommands