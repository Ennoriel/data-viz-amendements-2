export async function send(fetch, path, data) {

  const opts = { method: 'post', headers: {} }

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }
  return fetch(path, opts)
    .then(response => response.json())
}