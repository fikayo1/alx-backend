#!/usr/bin/env python3
"""
Basic flask app
"""
from flask import Flask
from flask import render_template
app = Flask(__name__)


@app.route('/')
def index():
    """
    Index function to render html page
    """
    return render_template("0-index.html")
