# investors-api
​
### Setup
Clone the repository.
​
Install packages by running following terminal
```sh
npm install
```
​
Create `.env` file and copy environment variables from `.env.example`.
​
Run these commands to setup database
```sh
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```
​
If all goes well, you should be able to start project with
```sh
npm start
```
