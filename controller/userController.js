const { userModel } = require("../model/userModel")

const createUser = async (req, res) => {
    try {
        await new userModel(req.body).save()
        res.send(`Welcome, sir ${req.body.isMan ? "sir" : "msr"} ${req.body.username.firstname}`)
    }
    catch (error) {
        res.send(error)
    }
}
const deleteAllUser=async(req,res)=>{
    
}
module.exports={createUser}