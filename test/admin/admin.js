const adapter = require('webrtc-adapter')
const { JanusAdminConfig } = require('../../src/Config')
const common = require('../common')
const config = new JanusAdminConfig(common.admin)

const JanusAdmin = require('../../src/JanusAdmin')

const listTokensButton = document.getElementById('listTokensButton')

const admin = new JanusAdmin(config, console)

const main = async () => {
  try {
    await admin.connect()
  } catch (e) {
    console.error(`Error connecting to Admin API: ${e}`)
  }

  const tokens = await getValidTokens()

  if (!tokens.length) {
    await admin.addToken(`bearflag:${Date.now()}`)
  }
}

async function getValidTokens() {
  let tokens

  try {
    tokens = await admin.getTokens()
  } catch (e) {
    console.error(`Error getting tokens from Admin API ${e}`)
  }

  const validTokens = []

  for (const { token } of tokens) {
    const [_, timestamp] = token.split(':')
    const currentTime = (new Date()).getTime()

    if (currentTime - timestamp < 5000) validTokens.push(token)
    else await admin.removeToken(token)
  }

  return validTokens
}

main()
