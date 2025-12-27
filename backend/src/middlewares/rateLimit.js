//add rate limit middleware
import rateLimit from 'express-rate-limit'; 

export const rateLimiterChat = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: "Too many requests from this IP, please try again later."
});


export const rateLimiterApp = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later."
});