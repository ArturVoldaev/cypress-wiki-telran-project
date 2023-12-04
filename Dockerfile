FROM cypress/included:12.17.1

RUN mkdir /my-cypress

WORKDIR /my-cypress

COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT [ "npx", "cypress","run" ]

CMD [""]
