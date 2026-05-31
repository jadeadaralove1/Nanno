export default {
  command: ['juicio'],
  category: 'fun',

  run: async (client, m, args) => {
    try {
      await client.sendMessage(m.chat, {
        react: { text: '⚖️', key: m.key }
      })

      const mentions =
        m.mentionedJid ||
        m.message?.extendedTextMessage?.contextInfo?.mentionedJid ||
        []

      const acusado = mentions[0]
      const abogado = mentions[1]

      if (!acusado || !abogado) {
        return client.reply(
          m.chat,
`⚖️ TRIBUNAL SUPREMO

Debes asignar roles:

.juicio @acusado @abogado

Sin eso no hay proceso legal.`,
          m
        )
      }

      const delitos = [
        'alteración del flujo normal del chat',
        'exceso de presencia narrativa',
        'interferencia emocional en terceros',
        'uso indebido de sarcasmo en entorno sensible',
        'desestabilización del orden del grupo',
        'comportamiento impredecible sin aviso',
        'ruptura leve de la realidad percibida'
      ]

      const pruebas = [
        'registro parcial del sistema lo confirma',
        'testigos contradictorios pero insistentes',
        'evidencia emocional no verificable',
        'el oráculo lo sugirió indirectamente',
        'coincidencia estadística sospechosa',
        'un error del sistema coincide con los hechos',
        'un gato fue testigo no confiable'
      ]

      const alegatos = [
        'el acusado actuó bajo confusión narrativa',
        'no hubo intención consciente comprobable',
        'el contexto alteró la percepción de los hechos',
        'el sistema influyó en su comportamiento',
        'la situación era inherentemente ambigua'
      ]

      const juradoOpiniones = [
        'culpable según mayoría silenciosa',
        'inocente con dudas persistentes',
        'división total del jurado',
        'veredicto emocionalmente influenciado',
        'resultado inconcluso por exceso de caos'
      ]

      const veredictos = [
        'INOCENTE ABSOLUTO',
        'INOCENTE CON SOSPECHA PERMANENTE',
        'CULPABLE PARCIAL',
        'CULPABLE SIMBÓLICO',
        'CULPABLE TOTAL',
        'VEREDICTO INDEFINIDO',
        'CASO ARCHIVADO POR CAOS EXCESIVO'
      ]

      const delito = delitos[Math.floor(Math.random() * delitos.length)]
      const prueba = pruebas[Math.floor(Math.random() * pruebas.length)]
      const alegato = alegatos[Math.floor(Math.random() * alegatos.length)]
      const jurado = juradoOpiniones[Math.floor(Math.random() * juradoOpiniones.length)]
      const veredicto = veredictos[Math.floor(Math.random() * veredictos.length)]

      const impacto = Math.floor(Math.random() * 100)

      const texto =
`╔════════════════════════════╗
        ⚖️ TRIBUNAL SUPREMO
╚════════════════════════════╝

👤 ACUSADO:
@${acusado.split('@')[0]}

🧑‍⚖️ ABOGADO DEFENSOR:
@${abogado.split('@')[0]}

━━━━━━━━━━━━━━━━━━━━━━━

📜 CARGO PRINCIPAL:
${delito}

🔍 PRUEBAS PRESENTADAS:
${prueba}

━━━━━━━━━━━━━━━━━━━━━━━

🎤 ALEGATO DE DEFENSA:
"${alegato}"

📊 IMPACTO LEGAL:
${impacto}%

━━━━━━━━━━━━━━━━━━━━━━━

👥 VEREDICTO DEL JURADO:
${jurado}

⚖️ FALLO FINAL DEL JUEZ:
${veredicto}

━━━━━━━━━━━━━━━━━━━━━━━

📌 OBSERVACIÓN FINAL:
"Ningún juicio aquí es completamente justo,
pero todos son definitivos."

⚖️ Sesión cerrada.`

      await client.sendMessage(m.chat, {
        text: texto,
        mentions: [acusado, abogado]
      })

    } catch (e) {
      console.error(e)
      client.reply(m.chat, '❌ El tribunal colapsó bajo exceso de evidencia contradictoria.', m)
    }
  }
}