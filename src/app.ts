import express from 'express'
import http from 'http'
import compression from 'compression'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

import { createConnection, getRepository, getConnection } from 'typeorm'

import 'reflect-metadata'
import { User } from './models/user'
import { transformData } from './utils/transformData'

const PORT = parseInt(process.env.PORT, 10) || 5000

const run = async () => {
  try {
    await createConnection()
    console.log('TypeORM connection success!')
  } catch (e) {
    console.log(`TypeORM connection error: ${e}`)
  }

  const app = express()

  app.use(compression())
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(cors())
  app.disable('etag')

  const userRepository = getRepository(User)

  app.get('/', async (req, res) => {
    res.send({ message: 'Sever is running!' })
  })

  app.post('/getStudent', async (req, res) => {
    const { Username, Password } = req.body

    const user = await userRepository.findOne({ ctzid: Username })

    if (user.phone === Password) {
      res.send(transformData(user))
    }

    res.send({})
  })

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}

run()

process.on('SIGINT', async () => {
  const connection = getConnection()

  try {
    await connection.close()
  } catch (e) {
    process.exit(e ? 1 : 0)
  }
})
