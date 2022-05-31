// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')

const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    console.log(JSON.parse(event.body))
    fetch(`https://api.telegram.org/bot5417214204:AAH7YOhkgmeScFPWc5cSQOPE29dxi8VAa2k/sendMessage?chat_id=@edisondeploylog&text=%F0%9F%91%B7%20Deploy%20Preview%20for%20wondrous-nasturtium-d39cd2%20processing.%20%F0%9F%91%B7%20Deploy%20Preview%20for%20wondrous-nasturtium-d39cd2%20processing.`)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
