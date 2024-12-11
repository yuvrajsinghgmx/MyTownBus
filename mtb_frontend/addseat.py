import requests

seaturl = "http://192.168.1.75:8000/api/seats/"
scheduleurl = "http://192.168.1.75:8000/api/add-schedule/"

headers = {
    "Content-Type": "application/json",
    # "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}

for j in range(1, 10): 
    date = 14 + j
    schedule_request = {
        "code": f"SCH{123 + j}",
        "bus": 1,
        "depart": 1,
        "destination": 2,
        "schedule": f"2024-12-{date}T10:30:00Z",
        "fare": 25.50,
        "status": "1"
    }
    
    schedule_response = requests.post(scheduleurl, json=schedule_request, headers=headers)

    if schedule_response.status_code == 201:
        print(f"Schedule {schedule_request['code']} created successfully!")
        print(schedule_response.json())
        
        # Extract schedule ID from response
        schedule_id = schedule_response.json().get("data", {}).get("id")
        
        # Loop to create seats for the created schedule
        for i in range(11, 40):
            seat_data = {
                "schedule": schedule_id,
                "seat_number": i,
                "status": "1"
            }
            seat_response = requests.post(seaturl, json=seat_data, headers=headers)
            
            if seat_response.status_code == 201:
                print(f"Seat {i} created successfully for Schedule {schedule_id}!")
            else:
                print(f"Failed to create Seat {i} for Schedule {schedule_id}. Status Code: {seat_response.status_code}")
                print(seat_response.text)
    else:
        print(f"Failed to create Schedule {schedule_request['code']}. Status Code: {schedule_response.status_code}")
        print(schedule_response.text)
