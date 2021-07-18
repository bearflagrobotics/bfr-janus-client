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

  let tokens = await admin.getTokens()
  console.log(JSON.stringify(tokens))

  await admin.addToken('bearflag')

  tokens = await admin.getTokens()
  console.log(JSON.stringify(tokens))

}

main()
