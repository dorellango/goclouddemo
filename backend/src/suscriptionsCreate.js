'use strict';

const { response, failedReponse } = require('./lib/responses')
const db = require('./lib/db')

module.exports.handler = async (event, context, callback) => {

  console.log('[ℹ️] Event:', JSON.stringify(event))

  const body = JSON.parse(event.body)

  try {
    const data = await saveSuscription(body)

    console.error(`[✅] Data successfully added`)

    return response(JSON.stringify(data))

  } catch (error) {

    console.error(`[💥] Error on request`);
    console.error(error);

    return failedReponse({ message: 'Whoops! this is embarrising' })

  };

};



/**
 * Persis a new suscription on database
 * @param {object} aws event body
 * @returns {Promise}
 */
const saveSuscription = (body) => {

  const { email, rut, name, phone } = body

  return new Promise((resolve, reject) => {

    const createdAt = Math.ceil(new Date().getTime() / 1000)

    const params = {
      Item: {
        "PK": `USER#${rut}`,
        "SK": `SUSCRIPTION#${createdAt}`,
        name, email, phone, createdAt
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
