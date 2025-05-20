"""Partify development configuration."""

import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# File Upload to var/uploads/
Partify_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = Partify_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

# Database file is var/Partify.sqlite3
DATABASE_FILENAME = Partify_ROOT/'var'/'database.sqlite3'
