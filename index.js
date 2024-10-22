//npm install express express-handlebars mysql2 nodemon sequelize

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const conn = require('./db/conn')

//Rotas
const temposRoutes = require('./routes/temposRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.use(
    express.urlencoded({
        extended : true
    })
)

app.use(express.json())
app.use(express.static('public'))
app.use('/tempos', temposRoutes)

conn
    .sync()
    .then(()=> {
        app.listen(3000)
    })
    .catch((err) => console.log(err))

