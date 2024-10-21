from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="frontend/build")

# Serve React app
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# Serve static files (JavaScript, CSS, etc.)
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder + "/static", path)

# Serve the manifest.json file
@app.route('/manifest.json')
def manifest():
    return send_from_directory(app.static_folder, 'manifest.json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
