const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server Up on port ${PORT}`)
})

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: true}))