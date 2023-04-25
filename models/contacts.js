const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const contactsSchema = new Schema(
  {
    name: { type: String,
    required: [true, "Please Enter Name"], },
    phones: [{phone:{ type:String,
                required: [true, "Please Enter Phone"],
                minLength: [9, "Phone should have more that 9 characters"],
                maxLength: [12, "Phone cannot exceed 12 characters"],}}]
  },
  { timestamps: true }
);
const ContactsModel= mongoose.model("Contact", contactsSchema);
module.exports= ContactsModel;