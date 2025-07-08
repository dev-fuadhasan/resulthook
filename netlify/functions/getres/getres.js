exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    // Get session cookie from headers
    const cookie = event.headers['cookie'] || event.headers['Cookie'] || '';
    const res = await fetch("https://eboardresults.com/v2/getres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { "Cookie": cookie } : {})
      },
      body: JSON.stringify(body)
    });
    const data = await res.text(); // sometimes API returns text/html
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy error", details: err.message })
    };
  }
}; 