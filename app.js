const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server Up on port ${PORT}`)
})

app.use(express.json())
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

let products = []

app.get('/', (req, res) => {
    try {
        res.render('form', {
            titulo: 'Ingrese su producto',
            firstLabel: 'Nombre del producto:',
            secondLabel: 'Precio del producto:',
            thirdLabel: 'URL del producto:'
        })
    } catch (error) {
        res.send({status: 'Error', message: error.message})
    }
})

app.get('/products', (req, res) => {
    try {
        res.render('products', {
            products: products
        })
    } catch (error) {
        res.send({status: 'Error', message: error.message})
    }
})

app.post('/', (req, res) => {
    try {
        let product = req.body
        if (!product.product || !product.price || !product.url) {
            res.send({status: 'Error', message: 'Faltan campos por completar'})
        } else {
            console.log('REQ.BODY', req.body)
            let newId = products.length + 1
            product.id = newId
            products.push(product)
            console.log({message: 'Saved product', product})
            res.render('products', {
                products: products
            }) 
        } 
    } catch (error) {
        res.send({status: 'Error', message: error.message})
    }
    
})