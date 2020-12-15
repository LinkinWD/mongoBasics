const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Yhteys tietokantaan avattu')
}).catch( err => {
    console.log('tuli pikku errori!')
    console.log(err)
})
/* 
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema) */
/* 
const tahdonElokuva = new Movie({title: 'tahdon', year: 1987, score: 8, rating: 'r'})
 */
/* Movie.insertMany([
    {title: 'kosto', year: 1999, score: 6, rating: 'k-18'},
    {title: 'paluu', year: 2099, score: 8, rating: 'k-16'},
    {title: 'prinsessa', year: 1989, score: 0, rating: 'r'}
]).then(data => {
    console.log('toimii')
    console.log(data)
}) */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Hinnan pitää olla positiivinen, tää on custom error viesti']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        // valitoidaan kokoja
        enum: ['s', 'm', 'l']
    }
})

//Muista käyttää vanhaa functota
/* productSchema.methods.greet = function() {
    console.log('hei vaan')
    console.log(`-from: ${this.name}`)
} */

productSchema.methods.toggleOnSale = function() {
    //muutetaan boolean vastakohdaksi
    this.onSale = !this.onSale
    return this.save()
}

productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat)
    return this.save
}

const Product = mongoose.model('Product', productSchema)


 const findProduct = async() => {
     const foundProduct = await Product.findOne({name: 'gloves'})
     console.log(foundProduct)
     await foundProduct.toggleOnSale()
     await foundProduct.addCategory('ulkoilu')
     console.log(foundProduct)

 }



 findProduct();
/* const bike = new Product({ name: 'gloves', price: 9, categories: ['cycling']})
bike.save()
.then(data => {
    console.log('se toimii')
    console.log(data)
})
.catch(err => {
    console.log('errooor')
    console.log(err)
}) */
Product.findOneAndUpdate({name: 'gloves'}, {price: 10}, {new: true, runValidators: true})
.then(data => {
    console.log('se toimii')
    console.log(data)
})
.catch(err => {
    console.log('errooor')
    console.log(err)})