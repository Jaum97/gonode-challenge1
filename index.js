const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const ageMiddleware = (req, res) => {
  const { age } = req.body
  if (age) {
    res.render(age > 17 ? 'major' : 'minor', { age })
  } else {
    res.render('main')
  }
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.post('/check', ageMiddleware, (req, res) => {})

app.get('/', (req, res) => {
  return res.render('main', { age: 0 })
})

app.listen(3000)
