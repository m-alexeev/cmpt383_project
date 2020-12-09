FROM python:3.8

RUN pip3 install Flask
RUN pip3 install SQLAlchemy
RUN pip3 install Flask-SQLAlchemy
RUN pip3 install python-dotenv

COPY reqs.txt reqs.txt
RUN pip install -r reqs.txt

ENV LISTEN_PORT=5000

ENV FLASK_APP=api.py
ENV FLASK_DEBUG = 1 
ENV FLASK_RUN_HOST=0.0.0.0


WORKDIR /backend
COPY . .

EXPOSE 5000
CMD flask run
