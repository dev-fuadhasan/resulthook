export async function fetchCaptcha() {
  const res = await fetch('/api/get-captcha');
  if (!res.ok) throw new Error('Failed to fetch captcha');
  return await res.json();
}

export async function fetchResult(data) {
  const res = await fetch('/api/get-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to fetch result');
  return await res.json();
} 