#!/bin/bash
python manage.py migrate
gunicorn mytownbus.wsgi:application --bind 0.0.0.0:$PORT

