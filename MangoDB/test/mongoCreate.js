const mongoose = require("mongoose");
const {Schema} = mongoose

require("dotenv").config()

mongoose.connect(process.env.MangoUrl).then(() => {
    console.log("DB Connected Successfully");

    // Listen for the 'open' event to ensure the connection is fully established
    mongoose.connection.once('open', async () => {
        console.log("Mongoose connection open");

        // Call the function to list collections
        await listCollections();
    });
}).catch((err) => {
    console.log("DB Connection Failed", err);
});

// User Schema
const UserSchema = Schema({
    name: {type: Number, unique: true},
    email: {type: String, unique: true},
    password: {type: String, default: "0"},
    skills: [{type: String}]
}) 

const User = mongoose.model("User", UserSchema)

async function listCollections() {
    try {
        const db = mongoose.connection.db;

        // List all collections in the database
        const collections = await db.listCollections().toArray();

        // Print the collection names
        collections.forEach((collection) => {
            console.log(collection.name);
        });
    } catch (err) {
        console.error("Error listing collections:", err);
    }
}

// let Std1 = new User(
//     {
//         name: 1,
//         email: "abc@gmail.com",
//         password: "1234",
//         skills: ["Python", "Java"]
//     }
// )

// try{
//     Std1.save()
//     console.log(
//         "Data Saved Successfully"
//     )
// }catch(err){
//     console.log(
//         "Data Not Saved", err
//     )
// }