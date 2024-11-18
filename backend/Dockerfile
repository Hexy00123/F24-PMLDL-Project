FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

EXPOSE 8000

COPY ./backend/requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./backend /backend
WORKDIR /backend

CMD ["python3", "-m", "src"]   