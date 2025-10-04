import requests

api_key = '5b3ce3597851110001cf62486f4e3aa4f8be4ef38000a4bcc384cc67'
url = 'https://api.openrouteservice.org/'
headers = {
    'Authorization': f'Bearer {api_key}'
}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Error: {response.status_code}')
