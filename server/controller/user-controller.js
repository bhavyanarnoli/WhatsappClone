export const addUser = (req, res) => {
  console.log('Final request body:', req.body);
  
  if (!req.body || Object.keys(req.body).length === 0) {
    console.warn('Empty request body received');
    return res.status(400).json({ error: 'Request body is empty' });
  }

  res.status(200).json({
    receivedData: req.body,
    message: "Successfully received data"
  });
}