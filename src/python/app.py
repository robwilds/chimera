import pandas as pd
import getRekognitionFiles as getRekognitionFiles

from flask import Flask,json,Response,request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app)

@app.route("/")
def default():
    return """<h1>Methods available:</h1>
                <p>getrekognitionfiles</p>
                <p>this will pull all images with aspect ai:labels</p>
                <p>and place in ../src/assets/ (or ../assets/) folder for image carousel in</p>
                """

@app.route("/getrekognitionfiles")
def getrekognitionfiles():
    return Response(getRekognitionFiles.main().to_json(orient = 'records'),mimetype='text/json')

if __name__ == "__main__":
  # Please do not set debug=True in production
  app.run(host="0.0.0.0", port=5202, debug=True)
