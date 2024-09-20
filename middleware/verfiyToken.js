import jwt from 'jsonwebtoken'

export const verifyToken = (res, req, next) => {
    
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "User not Authenticate.!"});
 
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
 
     if(err) return res.status(403).json({message: "Token is not valid"});
       
     req.userId = payload.id;

     next()
    })

 
}
