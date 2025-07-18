FROM ubuntu:latest

WORKDIR /app

COPY ./backend/requirements.txt /app/
COPY /backend /app/

SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv &&\
	python3 -m venv venv &&\
	source venv/bin/activate &&\
	pip install -r requirements.txt

EXPOSE 8080

CMD ["venv/bin/python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

