const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('dbconnect')
}

const sample = arr => arr[Math.floor(Math.random() * arr.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    console.log("All campgrounds deleted");

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() *1000)
        const randomPrice = Math.floor(Math.random() * 100)

        const camp = new Campground({
            author:'67b7523b2418b427fef73faf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dnxrobolb/image/upload/v1740167489/yelp-camp/ersc7774bab8nn7sosa6.webp',
                    filename: 'yelp-camp/ersc7774bab8nn7sosa6'
                },
                {
                    url: 'https://res.cloudinary.com/dnxrobolb/image/upload/v1740166820/yelp-camp/km2awljkswwj0gw4z63a.jpg',
                    filename: 'yelp-camp/km2awljkswwj0gw4z63a'
                }
            ],
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero quidem cumque dolores iusto saepe hic necessitatibus qui dignissimos excepturi nam, optio distinctio, inventore deserunt ipsa cup',
            price: randomPrice
        })
        await camp.save()
    }
};

seedDB().then(()=>{
    mongoose.connection.close()
    console.log('db closed')
})

