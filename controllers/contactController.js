const ContactsModel = require("../models/contacts");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const addContact = catchAsyncError(async (req, res,next) => {
    const{name,phone}=req.body
    if (!name || !phone)
        return next(new ErrorHandler("Please enter name and phone", 400));
    let contact=new ContactsModel({
        name:name,
        phones: [{phone}]
    })
 await contact.save()
    res.status(200).send(contact)
})


const getAllContacts = catchAsyncError(async (req, res) => {
    let {starting,phone,count}=req.query
    if(starting){
        console.log(starting)
        let contacts = await ContactsModel.find({name: {$regex:`^${starting}`,$options:"i"}})
        return res.status(200).send(contacts)
    }
    if(phone){
        let contacts = await ContactsModel.find({"phones.phone":phone})
        return res.status(200).send(contacts)
    }
    if(count){
        if(Number(count)==0){
            let contacts = await ContactsModel.aggregate([
                {
                    $set:{Count:{$size:"$phones"}}
                },
                {
                    $match:{"Count":{$lte:Number(count)}}
                }
            ])
            return res.status(200).send(contacts)
            
        }
        let contacts = await ContactsModel.aggregate([
            {
                $set:{Count:{$size:"$phones"}}
            },
            {
                $match:{"Count":{$gte:Number(count)}}
            }
        ])
        return res.status(200).send(contacts)
    }
    
    let contacts = await ContactsModel.find({})
    return res.status(200).send(contacts)

})

const getOneContact = catchAsyncError(async (req, res) => {

    let id = req.params.id
    let contact = await ContactsModel.findById(id)
    res.status(200).send(contact)

})
const updateContact = (async (req, res) => {

    let id = req.params.id;
    let {phone,phoneId,name}=req.body;
    if(name){
        const contact = await ContactsModel.findByIdAndUpdate(id,{name:name})
    }
    if(phone){
        const c = await ContactsModel.findOneAndUpdate({"phones._id":phoneId},{$set: { "phones.$.phone" : phone }})
        //return res.status(200).send(c)

    }
    

    res.status(200).send("success")
   

})

const deleteContact = catchAsyncError(async (req, res) => {

    let id = req.params.id
    
    await ContactsModel.deleteOne({_id:id})

    res.status(200).send('Contact is deleted !')
})

const addPhone = catchAsyncError(async (req, res,next) => {
    if (!req.body.phone)
        return next(new ErrorHandler("Please enter name and phone", 400));

    let id = req.params.id
    
    await ContactsModel.findByIdAndUpdate(id,{$push:{phones:{phone:req.body.phone}}})

    res.status(200).send('Contact is updated !')
})


module.exports = {
    addContact,
    getAllContacts,
    getOneContact,
    updateContact,
    deleteContact,
    addPhone
    
    
}