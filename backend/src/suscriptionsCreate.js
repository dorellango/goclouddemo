'use strict';

const { response, failedReponse } = require('../lib/helpers')

module.exports.handler = async (event, context, callback) => {

  console.log('[ℹ️] Event:', JSON.stringify(event))

  const body = JSON.parse(event.body)

  try {
    const data = await saveSuscription(body)

    console.error(`[✅] Data successfully added`)

    return response(JSON.stringify(data))

  } catch (error) {

    return failedReponse({ message: 'Whoops! this is embarrising' })

  };

};



/**
 * Persis a new suscription on database
 * @param {object} aws event body
 * @returns {Promise}
 */
const saveSuscription = (body) => {

  const { email, ...metadata } = body

  return new Promise((resolve, reject) => {

    const params = {
      Item: {
        "PK": `suscription#${email}`,
        "SK": `suscription#${email}`,
        metadata
      },
      TableName: process.env.SUSCRIPTIONS_TABLE
    };

    db.put(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
