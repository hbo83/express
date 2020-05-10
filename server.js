const express = require('express')
const app = express()
const port = 3000

var birds = require('./router')//imortuje router, kterej je ve vlastnim souboru
app.use('/router', birds)//pouzije router

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

//parametry
// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }

//kdyz zadam routu http://localhost:3000/users/12/books/123 response mi vrati {"userId":"12","bookId":"123"}
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

//next funkce spusti dalsi callback, kdyz jeden nestaci
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})

//muze definovat callbycky a pak je volat predanim jako arryay misto callbacku a taky ruzne kombinovat viz express guide
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  var cb2 = function (req, res) {
    res.send('Hello from C!')
  }
  
  app.get('/example/c', [cb0, cb1, cb2])

// RESPONSE METHODS - vzdy musime ukoncit pozadavek nejakym response ke klientovi aby byl cyklus ukoncen

// res.download() - vyzva na stahnuti souboru
// res.end() - ukonceni procesu
// res.json() - posle JSON
// res.jsonp() - posle JSON s podporou JSONP
// res.redirect() - presmeruje request
// res.render() - vyrenderuje sablonu
// res.send() - posle response jakykoliv
// res.sendFile() - posle soubor jako oktet stream
// res.sendStatus() - odesle status odpovedi

//pokud chceme na jednu routu navestit vice metod, muzeme takto zretezit
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))