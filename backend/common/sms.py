import requests
from config.config import settings

def send_sms(recipient, message):

    url = "https://app.text.lk/api/http/sms/send"
    
    # Define the headers
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    # Retrieve API credentials from settings
    # api_token = settings.api_token
    # sender_id = settings.sender_id

    # if not api_token or not sender_id:
    #     raise ValueError("API token or sender ID is missing. Please check your configuration.")

    # Define the payload
    payload = {
        "api_token": "227|5qfDmqCDJLKbyGGjCyFqvqemumN3B20DAZSjK5Ch672532ef",
        "recipient": recipient,
        "sender_id": "D-Partner",
        "type": "plain",
        "message": message
    }
    
    try:
        # Make the POST request to the API
        response = requests.post(url, json=payload, headers=headers)
        
        # Log the response for debugging
        print(f"API Response: {response.status_code}, {response.text}")
        
        # Check if the request was successful
        if response.status_code == 200:
            return response.json()  # Return the JSON response
        else:
            return {
                "error": f"Failed to send SMS. Status code: {response.status_code}",
                "details": response.text
            }
    except Exception as e:
        return {
            "error": "An exception occurred while sending the SMS.",
            "details": str(e)
        }