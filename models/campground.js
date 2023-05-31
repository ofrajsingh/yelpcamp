const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const Review= require('./review');
const User= require('./user');

const campgroundSchema= new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

campgroundSchema.post('findOneAndDelete',async function(data){
    if(data){
        await Review.deleteMany({
            _id: {$in: data.reviews}
        });
    }
})

module.exports= mongoose.model('Campground',campgroundSchema);