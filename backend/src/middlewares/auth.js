import JWT from "jsonwebtoken"

const AuthJwt=async (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json({
      message:"Unotharize : No token Provider"
    })
  }
  try {
    const decoded=JWT.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}

export default AuthJwt