/* ----- Package Imports ----- */
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

/* ----- Load env ----- */
dotenv.config()

/* ----- App Configuration ----- */
const app = express()
app.use(express.json())
app.use(cors())

/* ----- App Routes ----- */
app.use(require('./routes/authRoutes'))


/* ----- Errors Middlewares ----- */
app.use(require('./middlewares/errorMiddleware'))
app.use(require('./middlewares/notFoundMiddleware'))

/* ----- Starting the App ----- */
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        app.listen(process.env.PORT, () => {
            console.log(`App started on: http://localhost:${process.env.PORT}`)
        })
    } catch (e) {
        console.log('Failed to start the app.')
        console.log(e)
    }
}
start()