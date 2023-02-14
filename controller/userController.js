const bcrypt=require("bcrypt");
const { userModel } = require("../model/userModel")

const createUser = async (req, res) => {
    const confirm = await userModel.find({ email: req.body.email })
    if (confirm.length!=0) { return res.send("This account already used") };
    try {
        const salt=bcrypt.genSaltSync(1);
        const hash=bcrypt.hashSync(String(req.body.password),salt)
        const newUser={
            username:req.body.username,
            email:req.body.email,
            password:hash,
            isAdmin:req.body.isAdmin,
            isMan:req.body.isMan,
            photoUrl:req.body.photoUrl,
            locations:req.body.locations,
            articles:req.body.articles
        }
        console.log(hash)
        await new userModel(newUser).save()
        res.send(`Welcome, ${newUser.isMan ? "sir" : "msr"} ${newUser.username.first}`)
    }
    catch (error) {
        res.send(error)
    }
}
const deleteAllUser = async (req, res) => {
    res.send(await userModel.deleteMany());
}
module.exports = { createUser,deleteAllUser }