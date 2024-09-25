import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"
import { OAuth2Client } from 'google-auth-library';

export const register = async (req, res) => {
   
   
    const { username, email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword)
    
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password : hashPassword
            }
        });
    
        console.log(newUser)

        res.status(201).json({message : "User Created Successfully..!!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Failed to Created the user..!!"})
    }
    
}


export const login = async (req, res) => {
    
    const {username, password} = req.body;

    try {
         /*{checks the user where exist not not}*/

         const user = await prisma.user.findUnique({
            where:{username}
         })

         if(!user) return res.status(401).json({message : "Invalid credentials"});
 
         /*{checks the user password*/

         const isPassword = await bcrypt.compare(password, user.password);

         if(!isPassword) return res.status(401).json({message : "Invalid credentials"});

         /* Generate the cookie token and send to user have the max life of 7 days*/
         const age = 1000 * 60 * 60 * 24 * 7

         const {password : userPassword, ...userInfo} = user;

         const token = jwt.sign({
            id:user.id,
            isAdmin: true,
         }, process.env.JWT_SECRET_KEY, {expiresIn : age})

         
         
         res.cookie("token", token, {
            httpOnly:true,
           secure : true,
           maxAge : age
         }).status(200).json(userInfo)

    } catch (error) {
       console.log(error)
       res.status(500).json({message:"Failed to Login..!!"})
    }
}


export const logout =(req, res) => {
    
    res.clearCookie("token").status(200).json({message: "Logout Successfully...!!"})
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin =   async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Access token is missing' });
  }

  try {
    // Step 1: Verify the ID token using the OAuth2Client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your Google Client ID
    });

    const payload = ticket.getPayload(); // Contains user info, e.g., email, name
    const { email, name, picture } = payload;

    // Step 2: Check if the user exists in your database
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Step 3: If the user doesn't exist, create a new user in the database
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: name,
          email: email,
          avatar: picture,
        },
      });
    }

    // Step 4: Respond with user info
    return res.status(200).json({
      message: 'Google login successful',
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });

  } catch (error) {
    console.error('Error during Google login:', error.response?.data || error.message);

    return res.status(500).json({
      message: 'Google login failed',
      error: error.response?.data || error.message,
    });
  }
};



export const getRegiterUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

