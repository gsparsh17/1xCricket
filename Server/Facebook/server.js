const pageAccessToken = '500447259376758|SjTutDzw7hqXmvTeIW7F4eSuYc0'; // Replace with your actual token
const pageId = '500447259376758'; // Replace with your actual Page ID

async function publishToFacebook(content) {
  const url = `https://graph.facebook.com/${pageId}/feed`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: content,
      access_token: pageAccessToken
    })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Content published successfully:', data);
  } else {
    const errorData = await response.json();
    console.error('Failed to publish content:', errorData);
  }
}

// Usage
publishToFacebook("Hello, this is a test post from my app!");
