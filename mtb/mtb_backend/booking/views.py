from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def message_view(request):
    if request.method == 'GET':
        data = {"message": "Hello, this is a GET response!"}
        return JsonResponse(data)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            response_data = {"message": f"Received: {body.get('text', '')}"}
            return JsonResponse(response_data)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
