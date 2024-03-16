const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL =  "mongodb://127.0.0.1:27017/wonderlust"

main().then(() => {
    console.log("database connection established");
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "65e6cb30b468f90b67abd3a7"}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized in database")
}

initDb();







// here's directy to interact to insert and delte.
// Listing.deleteMany({}).then(() => {
//     console.log("deleted");

// }).catch((err) => {
//     console.log(err);
// });

// Listing.insertMany(data.data).then(() => {
//     console.log("insert seccess");
// }).catch((err) => {
//     console.log(err);
// })