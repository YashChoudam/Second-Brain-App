import jwt, { type JwtPayload } from "jsonwebtoken" ;
import type {Request , Response , NextFunction} from "express" ;

async function authUser(
    req : Request,
    res : Response,
    next : NextFunction
){  
    const token = req.headers.token ;
    const userJwtSecret = process.env.JWT_USERSECRET ;
    if(!userJwtSecret){
        throw new Error("JWT_USERSECRET is missing");
    }
    if (!token) {
        return res.status(403).send({message : "Token Required"});
    }
    try {
        const decodedInforamtion = await jwt.verify(token as string, userJwtSecret) as JwtPayload & {id : string , email : string};
        req.user = {
            id : decodedInforamtion.id ,
            email : decodedInforamtion.email 
        };
        next();
    } catch (error) {
        return res.status(403).send({message : "Invalid or expired token , re-login again "})
    }
}
export {authUser} ;