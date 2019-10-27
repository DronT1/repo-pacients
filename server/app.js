import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import logger from 'morgan'
import cors from 'cors'

const router = express.Router()
const app = express()
const SECRET_KEY = "secretkey23456"

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
//app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended:  false }))
app.use(bodyParser.json())

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql.98V",
  database: "s_pacient"
})

conn.connect((err) => {
    if (err) {
      return console.error("Ошибка connect: " + err.message);
    }

    console.log("Подключение к серверу MySQL успешно установлено");
 });


/*conn.end((err) => {
 if (err) {
   return console.log("Ошибка end: " + err.message);
 }
 console.log("Подключение закрыто");
});*/

/*
app.post('/addpacient', (req, res) => {
  const sql = 'INSERT INTO pacients SET ?'
  conn.query(sql, pacient, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send('Pacient added...')
  })
})
*/

app.get('/pacients', (req, res) => {
  const sql = 'SELECT * FROM pacients'
  conn.query(sql, (err, result) => {
    if(err) throw err
    res.send(result)
  })
})

app.delete('/pacients/:id', (req, res) => {

})

/**/

app.post('/register', (req, res) => {
    const  login  =  req.body.user.login
    const  password  =  bcrypt.hashSync(req.body.user.password)
    const user = {
        login: login,
        password: password
    }

    console.log('log ', login, ' pass ', password)
    const sql = 'INSERT INTO users_auth SET ?'
    const  expiresIn  =  24  *  60  *  60;
    const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
        expiresIn:  expiresIn
    })

    conn.query(sql, user, (err, result) => {
        if (err) throw err
        console.log(result)
    })

    console.log('accessToken ', accessToken)
})

app.post('/add-info', (req, res) => {
    const inf = {
        name: req.body.user.name,
        surname: req.body.user.surname,
        patronymic: req.body.user.patronymic,
        policy_number: req.body.user.policy_number
    }

    const sql = 'INSERT INTO pacients SET ?'
    conn.query(sql, inf, (err, result) => {
        if (err) throw err
        console.log(result)
    })
})

app.get('/', (req, res) => {
    res.status(200).send()
})


app.use(router)
const  port  =  process.env.PORT  ||  8080
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port)
});
