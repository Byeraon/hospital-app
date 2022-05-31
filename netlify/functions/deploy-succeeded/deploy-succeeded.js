// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch')


exports.handler = async (event, context) => {
  console.log(JSON.parse(event.body))
  let response
  try {
    response = await fetch(`https://api.telegram.org/bot5417214204:AAH7YOhkgmeScFPWc5cSQOPE29dxi8VAa2k/sendMessage?chat_id=@edisondeploylog&text=🖥 Project - ${JSON.parse(event.body).payload.name} %0A🔨 Latest commit - ${JSON.parse(event.body).payload.commit_ref} %0A😎 Deploy Preview - ${JSON.parse(event.body).payload.links.permalink} %0A👁 Committer - ${JSON.parse(event.body).payload.committer}`)
    // handle response
  } catch (err) {
    console.log("DIE")
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
  console.log(response)

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}
