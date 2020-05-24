const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const response = (body, statusCode = 200, cors = true) => {

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

const failedReponse = (body) => {

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify(body),
  };
}

module.exports = { response, failedReponse }