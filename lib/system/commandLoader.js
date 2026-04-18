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

// evita recargas simultáneas (MUY IMPORTANTE)
let isReloading = false

async function seeCommands(dir = commandsFolder) {
const items = fs.readdirSync(dir)

for (const fileOrFolder of items) {
const fullPath = path.join(dir, fileOrFolder)

if (fs.lstatSync(fullPath).isDirectory()) {
await seeCommands(fullPath)
continue
}

if (!fileOrFolder.endsWith(".js")) continue

const code = fs.readFileSync(fullPath, "utf8")

try {
parse(code, {
sourceType: "module",
plugins: ["topLevelAwait"]
})
} catch (err) {
console.error(chalk.red(`❌ Error de sintaxis en ${fileOrFolder}`))
console.error(err.message)
continue
}

try {
const modulePath = `${path.resolve(fullPath)}?update=${Date.now()}`
const imported = await import(modulePath)

const comando = imported.default
const pluginName = fileOrFolder.replace(".js", "")

global.plugins[pluginName] = imported

if (!comando?.command || typeof comando.run !== "function") continue

for (const cmd of comando.command) {
global.comandos.set(cmd.toLowerCase(), {
pluginName,
run: comando.run,
category: comando.category || "uncategorized",
isOwner: comando.isOwner || false,
isAdmin: comando.isAdmin || false,
botAdmin: comando.botAdmin || false,
before: imported.before || null,
after: imported.after || null,
info: comando.info || {}
})
}

} catch (e) {
console.error(chalk.red(`❌ Error en el plugin ${fileOrFolder}`))
console.error(e)
}

}
}

globalThis.reload = async (_ev, filename) => {
if (!filename.endsWith(".js")) return
if (isReloading) return

isReloading = true

try {
const fullPath = path.join(commandsFolder, filename)

if (!fs.existsSync(fullPath)) {
console.log(chalk.yellow(`⚠ Plugin eliminado:`), filename)
delete global.plugins[filename.replace(".js", "")]
global.comandos.clear()
await seeCommands()
isReloading = false
return
}

const code = fs.readFileSync(fullPath, "utf8")

try {
parse(code, {
sourceType: "module",
plugins: ["topLevelAwait"]
})
} catch (err) {
console.error(chalk.red(`❌ Error de sintaxis en ${filename}`))
console.error(err.message)
isReloading = false
return
}

const modulePath = `${fullPath}?update=${Date.now()}`
const imported = await import(modulePath)

global.plugins[filename.replace(".js", "")] = imported

global.comandos.clear()
await seeCommands()

} catch (e) {
console.error(chalk.red(`❌ Error al recargar ${filename}`))
console.error(e)
} finally {
isReloading = false
}
}

// watcher más estable
fs.watch(commandsFolder, { recursive: true }, (event, filename) => {
if (filename) globalThis.reload(event, filename)
})

export default seeCommands