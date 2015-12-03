# Runs a light web server locally, and opens the application in chrome.

# Chrome must be installed here.
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:8000/"

# Python 3 must be on the path
python -m http.server 8000
exit