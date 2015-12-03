:: Runs a light web server locally, and opens the application in chrome.

:: Python 3 must be on the path
start python -m http.server 8000

:: Chrome must be installed here.
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:8000/"

exit