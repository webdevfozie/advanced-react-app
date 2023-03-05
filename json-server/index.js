const fs = require('fs')
const jsonServer = require('json-server')
// const jwt = require('jsonwebtoken')
const path = require('path')

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})

// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Auth error!' })
  }

  next()
})

server.use(jsonServer.defaults())
server.use(router)

server.post('/login', (req, res) => {
  const { username, password } = req.body
  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
  const { users } = db

  const userFromDB = users.find((user) => (
    user.username === username && user.password === password
  ))

  if (userFromDB) {
    return res.json(userFromDB)
  }

  return res.status(403).json({ message: 'Auth error!' })
})

server.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on 8000 port')
})
