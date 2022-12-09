import jwt from 'jsonwebtoken';

 /**
  * private function generateToken
  * @param account 
  * @param secretSignature 
  * @param tokenLife 
  */
 let generateToken = (account, secretSignature, tokenLife) => {
   return new Promise((resolve, reject) => {
     // Thực hiện ký và tạo token
     jwt.sign(
       account,
       secretSignature,
       {
         algorithm: "HS256",
         expiresIn: tokenLife,
       },
       (error, token) => {
         if (error) {
           return reject(error);
         }
         resolve(token);
     });
   });
 }
 
 /**
  * This module used for verify jwt token
  * @param {*} token 
  * @param {*} secretKey 
  */
 let verifyToken = (token, secretKey) => {
   return new Promise((resolve, reject) => {
     jwt.verify(token, secretKey, (error, decoded) => {
       if (error) {
         return reject(error);
       }
       resolve(decoded);
     });
   });
 }

export default {
  generateToken: generateToken,
  verifyToken: verifyToken,
};