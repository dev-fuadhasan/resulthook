const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Fetch captcha image from eboardresults.com
  const captchaUrl = 'https://eboardresults.com/v2/captcha?t=' + Date.now();
  const response = await fetch(captchaUrl, {
    method: 'GET',
    headers: {
      'Referer': 'https://eboardresults.com/en/ebr.app/home/',
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    },
  });
  const buffer = await response.buffer();
  const cookie = response.headers.get('set-cookie');
  const base64 = buffer.toString('base64');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie || '',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      image: `data:image/png;base64,${base64}`,
      session: cookie || '',
    }),
  };
}; 