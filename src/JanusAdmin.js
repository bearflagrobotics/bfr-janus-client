const Janus = require('./Janus')

class JanusAdmin extends Janus {
  /**
   *
   * @param config
   * @param logger
   */
  constructor (config, logger) {
    super(config, logger)
    this.config = config
    this.protocol = 'janus-admin-protocol'
    this.sendCreate = false
  }

  transaction (type, payload, replyType) {
    const msg = Object.assign({}, payload, {
      admin_secret: this.config.secret
    })
    return super.transaction(type, msg, replyType || 'success')
  }

  listSessions () {
    return this.transaction('list_sessions').then(r => r.sessions)
  }

  addToken (token) {
    return this.transaction('add_token', { token }).then(() => token)
  }

  getTokens () {
    return this.transaction('list_tokens').then(r => r.data.tokens)
  }

  removeToken (token) {
    return this.transaction('remove_token', { token })
  }

  listHandles (sessionId) {
    return this.transaction('list_handles', {
      session_id: sessionId
    }).then(r => r.handles)
  }

  handleInfo (sessionId, handleId) {
    return this.transaction('handle_info', {
      session_id: sessionId,
      handle_id: handleId
    }).then(r => r.info)
  }
}

module.exports = JanusAdmin
