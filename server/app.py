from flask import Flask

app = Flask(__name__)

from test import kakaoOauth
app.register_blueprint(kakaoOauth)

if __name__ == "__main__":
    app.run(port = 5000, debug = True)
