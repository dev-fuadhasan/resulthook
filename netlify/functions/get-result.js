const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { exam, year, board, roll, reg, captcha, session } = JSON.parse(event.body);
  const params = new URLSearchParams({
    exam, year, board, roll, reg, captcha,
    result_type: '1', eiin: '', dcode: '', ccode: ''
  });
  const response = await fetch('https://eboardresults.com/v2/getres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': session,
      'Referer': 'https://eboardresults.com/en/ebr.app/home/',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
    },
    body: params.toString(),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { error: 'Invalid response', raw: text };
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
}; 