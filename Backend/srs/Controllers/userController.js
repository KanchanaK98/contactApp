let userModel = require('../models/user');

exports.addUser = async (req,res) => {
    const { name,role,email,contact,address,picture} = req.body;
    const newUser = new userModel({
        name,role,email,contact,address,picture
    })
    await newUser.save().then(() => {
        res.status(200).json({success:true, message:"User has successfully added"})
    }).catch(err => {
        res.status(500).json({success:false, message:"Error saving user"})
    })
}

exports.viewUser = async (req, res) => {
    await userModel.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.viewEachUser = async (req, res) => {
    let ID = req.params.id;
    await userModel.findOne({_id:ID}).then((users)=>{  
        res.json(users)
    }).catch((err)=>{
        res.status(500).send({error:err.message})
    })
}


exports.deleteUser = async (req, res) => {
    let ID = req.params.id;
    await userModel.deleteOne({_id:ID}).then(()=>{
        res.status(200).json({success:true, message:"User has successfully deleted"})
    }).catch(err => {
        res.status(500).json({success:false, message:"Error deleting user"})
    })
}
