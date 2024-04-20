import JWT from 'jsonwebtoken';

import { User } from '@prisma/client';
import { JWTUser } from '../interfaces';

const JWT_SECRET = "$uper@1234.";

class JWTService{
    public static generateTokenForUser(user: User){
        

        const payload: JWTUser = {
            id : user?. id,
            email: user?.email,
        };

        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }

    // public static decodeToken(token: string){
    //     return JWT.verify(token, JWT_SECRET) as JWTUser;
    // }

    public static decodeToken(token : string){

        // console.log('decodeToken', token);
        
        const jwtToken = token.split(' ')[1];
        // console.log('jwtToekn', jwtToken);
        
        try {
        
        const payload = JWT.verify(jwtToken ,JWT_SECRET as string);
        // console.log(payload);
        
        return payload as JWTUser;
        
        } catch (error) {
        console.error('JWT verification failed:', error);
        // throw error;
        }
        
        return null;
        }
}

export default JWTService;


