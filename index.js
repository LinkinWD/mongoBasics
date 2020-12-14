const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Yhteys tietokantaan avattu')
}).catch( err => {
    console.log('tuli pikku errori!')
    console.log(err)
})

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema)
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
