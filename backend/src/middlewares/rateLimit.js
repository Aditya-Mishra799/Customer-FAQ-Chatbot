//add rate limit middleware
import rateLimit from 'express-rate-limit'; 

export const rateLimiterChat = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 20, 
  message: "Too many requests from this IP, please try again later."
});


export const rateLimiterApp = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 60, 
  message: "Too many requests from this IP, please try again later."
});