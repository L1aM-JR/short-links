export async function request(url, method, body, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }
    
    const result = await fetch(url, { method, body, headers });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message || 'Что-то пошло не так');
    }

    return data;
  } catch(e) {
    throw e;
  }
}