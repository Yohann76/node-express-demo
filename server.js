let express = require('express')
let app = express()

let session = require('express-session')

// Using Node.js `require()`
let  mongoose = require('mongoose');


require('dotenv').config()



// templating motors
app.set('view engine','ejs')

// middleware
app.use('/assets', express.static('public')) // for delivery all static file // with prefix asset root
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))


app.use(require('./middlewares/flash'))


// routes
app.get('/', (request, response) => {
  console.log(request.session)
  //

  let Message = require('./models/message')
  Message.all(function (messages){
    response.render('pages/index', {messages:messages})
  })


})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '' ) {
        request.flash('error',"Vous n'avez pas posté de message" )
        response.redirect('/')
    }
    else {
        let Message = require('./models/message')
        // use mysql or mongoose
        Message.create(request.body.message , function(){
            request.flash('success',"Message bien envoyé" )
            response.redirect('/')
        })
    }
})



app.get('/message/:id', (request,response) => {

    // response.send(request.params.id)
    let Message = require('./models.message')
    Message.find(request.params.id, function(message) {
        response.render('messages/show', {message:message})
    })
})



app.listen(8080)