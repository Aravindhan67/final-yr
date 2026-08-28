import requests
import sys

def generate_features() -> list[float]:
    """
    Generates a dummy feature vector.
    The AI Android Malware Detection System expects exactly 470 numerical features.
    
    Returns:
        list[float]: A list containing 470 zeros.
    """
    return [0.0] * 470

def send_request(url: str, payload: dict) -> None:
    """
    Sends a POST request to the specified URL with the JSON payload.
    
    Args:
        url (str): The endpoint URL.
        payload (dict): The JSON body containing the feature vector.
    """
    try:
        # Send POST request to the API
        response = requests.post(url, json=payload, timeout=10)
        
        # Print the HTTP status code
        print(f"HTTP Status Code: {response.status_code}\n")
        
        try:
            # Attempt to parse response as JSON
            response_json = response.json()
            print("Response JSON:")
            print(response_json)
            
            # Print specific fields if the request was successful
            if response.status_code == 200 and "prediction" in response_json:
                print("\n--- Prediction Results ---")
                print(f"Prediction: {response_json.get('prediction')}")
                print(f"Confidence: {response_json.get('confidence')}%")
                print(f"Risk Level: {response_json.get('risk')}")
            else:
                print(f"\nAPI Error: {response_json.get('error', 'Unknown Error')}")
                
        except ValueError:
            print("\nError: Failed to parse the response as JSON.")
            print(f"Raw Response Text: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("Error: Cannot connect to Flask server. Please make sure the backend is running at http://127.0.0.1:5000")
    except requests.exceptions.Timeout:
        print("Error: The request to the Flask server timed out.")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")

def main() -> None:
    """
    Main entry point for the testing script.
    """
    url = "http://127.0.0.1:5000/predict"
    
    print("Generating feature vector...")
    features = generate_features()
    
    payload = {
        "features": features
    }
    
    print(f"Sending JSON request to {url}...\n")
    send_request(url, payload)

if __name__ == "__main__":
    main()
