"""Partify package initializer."""
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)  # pylint: disable=invalid-name
cors = CORS(app, origins='*')

# Read settings from config module (Partify/config.py)
app.config.from_object('Partify.config')

import Partify.api  # noqa: E402  pylint: disable=wrong-import-position
import Partify.model  # noqa: E402  pylint: disable=wrong-import-position
