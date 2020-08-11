# E-wallet

E-wallet allow customers to pre-load their wallet from their Debit cards and transfer of virtual money as a gift to another customer within the platform.. It is built on top of NodeJS and Express. It is higly flexible because it provides users with opportunity to:

- sign up
- sign in
- Change password
- fund wallet using PAYSTACK API
- transfer or gift walllet
- user profile

# Getting Started

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/E-wallet-backend)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- A RESTAPI client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasnt cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run dev' to start the application
- In a browser address bar navigate to 'http://localhost:5000'

# Using E-wallet through a restful client

- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST, PUT

### Signin

- Use the POST method
- Use this url http://localhost:5000/api/signin

### Signup

- Use the POST method
- Use this url http://localhost:5000/api/signup

- As user get signup automatically the balance is Zero

### Reset password

- Use the POST method
- Use this url http://localhost:5000/api/resetpasstoken/:id-:token
- replace id with user id and its token gotten from the logged in user

### Fund Wallet

- Use the POST method
- Use this url http://localhost:5000/api/paystack/fund
- Paystack url is generated and used on the browser

- Use the GET method
- Use this url http://localhost:5000/api/paystack/callback
- A verify payment to update the user balance

### Transfer Wallet

- Use the POST method
- Use this url http://localhost:5000/api/transfer/:accountId

### User profile

- Use the POST method
- Use this url http://localhost:5000/api/profile
- user can upload image that will reside on his dashboard
- user can also have a username

## Built With

- NodeJs
- Express
- MySQL (database)
- Sequelize (ORM)
- AWS (image upload)

## Author

- Abonyi Nnamdi Francis
