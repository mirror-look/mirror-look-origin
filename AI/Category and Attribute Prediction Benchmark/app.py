from flask import Flask, render_template, url_for, request, redirect
from flask_bootstrap import Bootstrap

import os
import DeepFashionModelVGG16Predict

app = Flask(__name__, template_folder='templates')
Bootstrap(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        upload_file = request.files['file']
        if upload_file.filename != '':
            image_path = os.path.join('static', upload_file.filename)
            upload_file.save(image_path)
            predictions = DeepFashionModelVGG16Predict.get_prediction(image_path)
            # print(predictions)

            result = {
                'predictions': predictions,
                'image_path': image_path,
            }

            return render_template('result.html', data=result)

    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
