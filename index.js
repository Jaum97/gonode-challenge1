const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const logMiddleware = (req, res, next) => {
  const { age } = req.query
  if (!age) {
    res.redirect('/')
  }
  return next()
}
app.use(logMiddleware)

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('main')
})

app.post('/check', (req, res) => {
  const x = req.body.age
  return x > 17 ? res.redirect(`/major/${x}`) : res.redirect(`/minor/${x}`)
})

app.get('/major/:x', logMiddleware, (req, res) => {
  return res.send(`Você é maior de idade e possui ${req.params.x} anos`)
})

app.get('/minor/:x', logMiddleware, (req, res) => {
  return res.send(`Você é menor de idade e possui ${req.params.x} anos`)
})

app.listen(3000)
