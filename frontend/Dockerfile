FROM node:14

WORKDIR /frontend

COPY ./frontend/package.json ./package.json
COPY ./frontend/package-lock.json ./package-lock.json

RUN npm install

COPY ./frontend ./

EXPOSE 3000 

CMD ["npm", "start"]
