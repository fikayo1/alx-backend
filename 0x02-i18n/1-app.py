#!/usr/bin/env python3
"""
Basic flask app
"""
from flask import Flask
from flask import render_template
from flask_babel import Babel
app = Flask(__name__)
babel = Babel(app)

class Config(object):
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = "en"
    BABLE_DEFAULT_TIMEZONE = "UTC"


@app.route("/")
def index():
    """
    Handle the index route
    """
    return render_template("1-index.html")


if __name__ == '__main__':
    app.run(debug=True)
