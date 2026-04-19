export default async function handler(req, res) {
  const { method, headers, body } = req;
  
  const response = await fetch('http://103.90.75.163:8080/api/tours/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  
  const data = await response.json();
  res.status(response.status).json(data);
}
