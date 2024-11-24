import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    image: {
        type: String,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now,
        required: false,
    },
    // isVerified:{
    //     type: Boolean,
    //     default: false
    // },
    // resetPasswordToken:String,
    // resetPasswordExpiresAt:Date,
    // verificationToken:String,
    // verificationTokenExpiresAt:Date,
}, { timestamps: true })

export const User = mongoose.model('User', userSchema);