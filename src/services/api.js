const API_BASE_URL = '/api';

// Fetch all webhooks
export const getWebhooks = async () => {
  const response = await fetch(`${API_BASE_URL}/webhooks`);

  if (!response.ok) {
    throw new Error('Failed to fetch webhooks');
  }

  return response.json();
};

// Create a new webhook
export const createWebhook = async (name) => {
  const response = await fetch(`${API_BASE_URL}/webhooks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to create webhook');
  }

  return response.json();
};