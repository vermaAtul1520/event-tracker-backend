const express = require('express')
const cors = require('cors')
const Account = require('./routes/Account')
const Events = require('./routes/Events')
const Ticket = require('./routes/Tickets')
const Comments = require('./routes/Comments')
const Rating = require('./routes/Rating')

const authenticateUser = require('./Middleware/Auth')
const {cacheMiddleware} = require('./Middleware/RedisMiddleware')
require('./db/mongoose')
require('dotenv').config()


const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(
  cors({
    origin: '*',
  }),
)

app.use('/accounts', Account);
app.use(authenticateUser);
app.use('/tickets',Ticket);
app.use('/comments',Comments);
app.use('/rates',Rating)

// caching apply below this route..
app.use(cacheMiddleware)
app.use('/events',Events);


app.get('/', (req, res) => {
  res.send({ msg: 'Hey congratulations, we are connected' })
})

app.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + port)
})