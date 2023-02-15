const mongoose = require("mongoose")

const uri = process.env.URI || 'mongodb+srv://Unread:unread@unread.l0q0nzx.mongodb.net/?retryWrites=true&w=majority'

const connect = async () => {

    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(uri)
        console.log("\x1b[33mSuccesfully connected to MongoDB\x1b[0m\n")
    } catch (error) {
        console.log(error)
        throw new Error(error).message(error.message)
    }
}
module.exports = { connect }