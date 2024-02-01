const express = require('express')
const cors = require('cors')
const Account = require('./routes/Account')
const Events = require('./routes/Events')
const Ticket = require('./routes/Tickets')
const authenticateUser = require('./Middleware/Auth')
require('./db/mongoose')
require('dotenv').config()


const app = express()

const port = process.env.PORT

app.use(express.json())

app.use('/accounts', Account);
app.use(authenticateUser);
app.use('/events',Events);
app.use('/tickets',Ticket)

app.use(
  cors({
    origin: '*',
  }),
)

app.get('/', (req, res) => {
  res.send({ msg: 'Hey congratulations, we are connected' })
})

app.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + port)
})