const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
let decodedToken = '';
module.exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.sendStatus(401);
    }
}
module.exports.dataQuery = (req, res, next) => {
    const authHeader = req.headers.authorization;
    logger.info(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            logger.info(user.first_name)
            res.json({           
                first_name: user.first_name,
                id: user.id,
                role: user.role
              });
            next(res.json({           
                first_name: user.first_name,
                id: user.id,
                role: user.role
              }))
        })
    } else {
        res.sendStatus(401);
    }
}