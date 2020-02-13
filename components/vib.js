const { ViberClient } = require('messaging-api-viber')

const authToken = '4ae0a46a32e7de59-8008f09131f0c458-73e057ff3f0dcbcb'
const client = ViberClient.connect(authToken)
const USER_ID = 'uO2Qoyrzuxkzsp3aJAR7BA=='

exports.cl = function (e){
  e = typeof e != 'string' ? JSON.stringify(e, null, 4) : e

client.sendMessage(USER_ID, {
  type: 'text',
  text: e
  })
}
