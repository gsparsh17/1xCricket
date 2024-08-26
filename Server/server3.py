import requests
from pymongo import MongoClient

wp_api_url = 'https://1xcricket.com/wp-json/wp/v2/posts'

response = requests.get(wp_api_url)

# Check the status code
if response.status_code == 200:
    try:
        posts = response.json()
    except requests.exceptions.JSONDecodeError as e:
        print("Error decoding JSON:", e)
        posts = []
else:
    print(f"Failed to retrieve data: {response.status_code} - {response.text}")
    posts = []

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['newsdb']
collection = db['posts']

# Insert data into MongoDB
for post in posts:
    post_data = {
        'id': post['id'],
        'title': post['title']['rendered'],
        'content': post['content']['rendered'],
        'date': post['date'],
        'slug': post['slug'],
        'url': post['link']
    }
    collection.update_one({'id': post['id']}, {'$set': post_data}, upsert=True)

print("Data transfer complete.")