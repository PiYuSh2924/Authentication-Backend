import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// register controllers
export const registerUser = async (req, res) => {
    try {
        //extract user info from the req.body
        const {username, email, password, role} = req.body

        const checkExistingUser = await User.findOne({$or : [{username}, {email}]})
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create a new user and save in your database
        const newlyCreatedUser = new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'
        })

        await newlyCreatedUser.save()

        if(newlyCreatedUser){
            res.status(200).json({
                success : true,
                message : "User created successfully!",
                data : newlyCreatedUser
            })
        } else {
            res.status(400).json({
                success : false,
                message : "Unable to register user! Please try again."
            })
        }

    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            success: true,
            message: "Something went wrong! Please try again."
        })
    }
}


//login controllers
export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

       //validate username
       const user = await User.findOne({username});
       if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials!"
        })
       }
       
       //validate password
       const isPasswordMatch = await bcrypt.compare(password, user.password)
       if(!isPasswordMatch){
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials!"
        })
       }

       //creating bearer token for session management
       const accessToken = jwt.sign({
        userId : user._id,
        username : user.username,
        role : user.role
       }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m'
       })

       res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        accessToken
       })

    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            success: true,
            message: "Something went wrong! Please try again."
        })
    }
}