from flask import Flask, send_from_directory
from flasgger import Swagger
from routes.alerts import alert_bp
from routes.gps_data import gps_data_bp
from routes.animals import animal_bp
from db import db
from flask import Flask, send_from_directory
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

# Initialise Flask app
app = Flask(__name__, static_folder="frontend/build")

# Enable CORS for all routes
CORS(app)
# Configure SQLAlchemy using environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Registering API blueprints
app.register_blueprint(gps_data_bp, url_prefix="/gps_data")
app.register_blueprint(alert_bp, url_prefix="/alerts")
app.register_blueprint(animal_bp, url_prefix="/animals")

# Initialise the db
db.init_app(app)

# Swaggar init
swagger = Swagger(app, template={
    "swagger": "2.0",
    "info": {
        "title": "Fauna Link APIs",
        "description": "API documentation for the Fauna Link wildlife tracking system",
        "version": "1.0.0"
    },
    "basePath": "/"
})

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
