import requests

url = "http://192.168.1.75:8000/seats/"

headers = {
    "Content-Type": "application/json",
    # "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}

for i in range(1, 40):
    data = {
        "schedule": 1,
        "seat_number": i,
        "status": "1"
    }
    response = requests.post(url, json=data, headers=headers)

if response.status_code == 201:
    print(f"Seat {i} created successfully!")
    print(response.json())
else:
    print(f"Request failed for seat {i} with status code: {response.status_code}")
    print(response.text)
