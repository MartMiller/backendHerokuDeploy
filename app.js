const express = require('express')
// const config = require('config')
const mongoose = require('mongoose')
// const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const app = express()

// Middleware
app.use(express.json({ extended: true }))
// app.use(cors());

app.use('/', require('./routes/user.routes'))
app.use('/auth', require('./routes/auth.routes'))

// const PORT = config.get('port') || 5000
const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  }
  catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()



