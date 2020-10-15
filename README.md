
[![Notes App](mockup.svg)](https://notes-app-1154.herokuapp.com)<br />

<p align="center">

  <h3 align="center">Markdown Notes App</h3>

  <p align="center">
    An Online Notetaking App
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

I wanted to learn more technologies, specifically Typescript, so I decided to make a note taking app using TypeScript. <br>
The way it works is simple. You just login and write notes. It's all saved to MongoDB so you can access them from anywhere.

### Key features:
* Account creation
* Google Login Button
* Markdown formatting
* Every note is stored on MongoDB

### Built With

* [ReactJS](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [TailwindCSS](https://tailwindcss.com/)
* [ExpressJS](https://expressjs.com/)
* [PassportJS](https://www.passportjs.org/)
* [MongooseJS](https://mongoosejs.com/)
* [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm

1. On the root folder run:
```sh
npm install
cd client && npm install
cd server && npm install
```

2. On the `Client` folder add a .env with the following:
```
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

3. On the `Server` folder add a .env with the following:
```
SESSION_SECRET=YOUR_SESSION_SECRET
PASSWORD_SECRET=YOUR_PASSWORD_SECRET
MONGO_DB_PASS=YOUR_MONGO_DB_URI
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

4. Then on your root folder just run:
```sh
npm run dev
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact
lucasmercado101@gmail.com

Project Link: https://github.com/Lucasmercado101/markdown-notes-app

## Acknowledgements
* [React Icons](https://react-icons.github.io/react-icons)
* [Framer Motion](https://www.framer.com/motion)
* [Axios](https://github.com/axios/axios)
