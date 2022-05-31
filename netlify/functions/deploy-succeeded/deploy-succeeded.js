    // Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
    const fetch = require('node-fetch')

    const API_ENDPOINT = 'https://api.telegram.org/bot5417214204:AAH7YOhkgmeScFPWc5cSQOPE29dxi8VAa2k/sendMessage?chat_id=@edisondeploylog&text=%F0%9F%91%B7%20Deploy%20Preview%20for%20wondrous-nasturtium-d39cd2%20processing.%20%F0%9F%91%B7%20Deploy%20Preview%20for%20wondrous-nasturtium-d39cd2%20processing.'

    exports.handler = async (event, context) => {
      let response
      try {
        console.log(JSON.parse(event.body))
        response = await fetch(API_ENDPOINT)
        console.log(response)
        // handle response
      } catch (err) {
        return {
          statusCode: err.statusCode || 500,
          body: JSON.stringify({
            error: err.message
          })
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          data: response
        })
      }
    }
