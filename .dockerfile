FROM node:20-alpine

WORKDIR /REACT-ADMIN-DASHBOARD/

COPY public/ /public
COPY src/ /src
COPY package.json /REACT-ADMIN-DASHBOARD/

RUN npm install
ENV NODE_ENV=production
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]