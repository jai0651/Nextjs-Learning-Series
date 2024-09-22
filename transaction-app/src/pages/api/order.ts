import { NextApiRequest, NextApiResponse } from 'next';

// Example API handler to send data to the Spring Boot backend
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const orderData = req.body;

    // Send the data to your Spring Boot backend
    const response = await fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: 'Failed to place order' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
