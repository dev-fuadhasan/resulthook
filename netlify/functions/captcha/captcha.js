exports.handler = async function(event, context) {
  const url = `https://eboardresults.com/v2/captcha?t=${Date.now()}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    const arrayBuffer = await res.arrayBuffer();
    const cookie = res.headers.get('set-cookie') || '';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Set-Cookie': cookie,
        'Cache-Control': 'no-store',
      },
      body: Buffer.from(arrayBuffer).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch captcha', details: err.message })
    };
  }
}; 