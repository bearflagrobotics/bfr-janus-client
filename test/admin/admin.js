const adapter = require('webrtc-adapter')
const { JanusConfig, JanusAdminConfig } = require('../../src/Config')
const common = require('../common')
const config = new JanusAdminConfig(common.admin)

const Janus = require('../../src/Janus')
const JanusAdmin = require('../../src/JanusAdmin')

const admin = new JanusAdmin(config, console)

const main = async () => {
  try {
    await admin.connect()
  } catch (e) {
    console.error(`Unable to connect to Admin API`)
    return
  }

  let token = await getValidToken()

  if (!token) {
    token = await admin.addToken(`bearflag:${Date.now()}`)
  }

  const janusConfig = new JanusConfig({ token, ...common.janus })
  const janus = new Janus(janusConfig, console)

  try {
    await janus.connect()
  } catch (e) {
    console.error(`Unable to connect to Janus`)
    return
  }

}

async function getValidToken() {
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

  return validTokens[0]
}

main()
