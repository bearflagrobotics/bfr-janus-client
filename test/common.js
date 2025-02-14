
module.exports = {
  admin: {
    url: 'ws://video-koda-000.bearflagrobotics.com:7188',
    keepAliveIntervalMs: 30000,
    options: {
      rejectUnauthorized: false
    },
    filterDirectCandidates: true,
    recordDirectory: '/workspace/records/',
    bitrate: 774144,
    firSeconds: 10,
    publishers: 20,
  },
  janus: {
    url: 'ws://video-koda-000.bearflagrobotics.com:8188',
    keepAliveIntervalMs: 30000,
    options: {
      rejectUnauthorized: false
    },
    filterDirectCandidates: true,
    recordDirectory: '/workspace/records/',
    bitrate: 774144,
    firSeconds: 10,
    publishers: 20
  },
  peerConnectionConfig: {
    iceServers: [
      { url: 'stun:turnserver.techteamer.com:443' },
      { username: 'demo', url: 'turn:turnserver.techteamer.com:443?transport=udp', credential: 'secret' },
      { username: 'demo', url: 'turn:turnserver.techteamer.com:443?transport=tcp', credential: 'secret' }
    ]
  }
}
