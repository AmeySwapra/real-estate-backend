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

export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();
    
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: name,
          email,
        },
      });
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    res
      .cookie('jwt', jwtToken, { httpOnly: true, secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
      .status(200)
      .json({ message: 'Google Login Successful', username: user.username });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: 'Google login failed' });
  }
};


