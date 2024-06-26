// getting-started.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true,unique: true},
    password: {type: String ,default: ''},
    address: {type: String ,default: ''},
    pincode: {type: String ,default: ''},
    phone: {type: String ,default: ''},
     
    
    
},{timestamps: true,collection: "users"})

mongoose.models = {}

// export default mongoose.model("User",UserSchema)
export default mongoose.models.User || mongoose.model("User",UserSchema)
