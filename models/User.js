import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"], // only allow 'user' or 'admin' roles
        default: "user",
    },
}, {
    timestamps: true,      // automatically adds createdAt and updatedAt fields to the documents    
    toJSON: {             // Transform function that modifies the document before converting to JSON
        transform: function(doc, ret) {
            delete ret.role;
            return ret;
        }
    }
})  

const User = mongoose.model('User', UserSchema)
export default User;