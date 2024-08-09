
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 200,
    message: { message: "Request Limit Reached" }
})

export default limiter