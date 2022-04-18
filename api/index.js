require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

Sentry.init({
  dsn: 'https://8dfcc2b8b8aa417799b03948fa1ed303@o1177953.ingest.sentry.io/6288761',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type' : 'application/json' })
//     response.end(JSON.stringify(Notes))
// })

app.use('/api/notes', notesRouter)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFound)

app.use(Sentry.Handlers.errorHandler())

app.use(handleError)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})

module.exports = { app, server }
