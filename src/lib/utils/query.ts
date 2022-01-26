export async function send(_, path, data) {
	const opts = { method: 'post', headers: {} } as any;

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}
	return fetch(path, opts)
		.then((response) => response.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}
