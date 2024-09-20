import jwt from 'jsonwebtoken'

export const shouldBeLogined = async (req, res) => {

   console.log(req.userId)
   res.status(200).json({message: "You are Authenticate.!"})

}



export const shouldBeAdmin = async (req, res) => {
   const token = req.cookies.token;


   if (!token) {
       console.log("No token provided");
       return res.status(401).json({ message: "User not Authenticated!" });
   }

   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
       

       if (err) {
           
           return res.status(403).json({ message: "Token is not valid" });
       }

    

       if (!payload.isAdmin) {
           console.log("User is not an admin");
           return res.status(403).json({ message: "Not Authorized" });
       }

       res.status(200).json({ message: "You are authenticated!" });
   });
};
