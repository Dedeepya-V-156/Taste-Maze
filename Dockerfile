FROM node:erbium

#Setting up AWS Credentials and API Keys
ENV AWS_ACCESS_KEY_ID XXXX
ENV AWS_SECRET_ACCESS_KEY XXXX
ENV AWS_SESSION_TOKEN XXXX
ENV tdapikey XXXX
ENV omdbapikey XXXX

ADD / /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD node app.js