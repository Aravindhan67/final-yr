import requests
import os
import sys

def create_dummy_csv(filename: str):
    """Creates a dummy CSV with 470 columns for testing."""
    columns = [f"feat_{i}" for i in range(470)]
    row = [0.0] * 470
    with open(filename, 'w') as f:
        f.write(",".join(columns) + "\n")
        f.write(",".join(map(str, row)) + "\n")
        f.write(",".join(map(str, row)) + "\n")

def test_upload(url: str, filepath: str):
    print(f"Uploading {filepath} to {url}...\n")
    try:
        with open(filepath, 'rb') as f:
            files = {'file': (os.path.basename(filepath), f, 'text/csv')}
            response = requests.post(url, files=files, timeout=30)
            
        print(f"HTTP Status Code: {response.status_code}")
        
        try:
            resp_json = response.json()
            print("Response JSON:")
            print(resp_json)
            
            if response.status_code == 200 and resp_json.get("status") == "success":
                print(f"\n--- Upload Results ---")
                print(f"Rows Processed: {resp_json.get('rows_processed')}")
                print(f"Prediction File: {resp_json.get('report_file')}")
                
                download_url = f"http://127.0.0.1:5000{resp_json.get('download_url')}"
                print(f"\nDownloading report from {download_url}...")
                
                dl_response = requests.get(download_url)
                if dl_response.status_code == 200:
                    dl_filename = f"downloaded_{resp_json.get('report_file')}"
                    with open(dl_filename, 'wb') as df:
                        df.write(dl_response.content)
                    print(f"Download Status: Success! Saved to {dl_filename}")
                else:
                    print(f"Download Status: Failed with status code {dl_response.status_code}")
            else:
                print("\nUpload failed.")
                
        except ValueError:
            print("Failed to parse JSON response.")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def main():
    upload_url = "http://127.0.0.1:5000/upload"
    test_csv = "test_data.csv"
    
    print("Generating test CSV...")
    create_dummy_csv(test_csv)
    
    test_upload(upload_url, test_csv)
    
    # Clean up test_data.csv
    if os.path.exists(test_csv):
        os.remove(test_csv)

if __name__ == "__main__":
    main()
