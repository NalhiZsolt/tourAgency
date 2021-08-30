const jwt = require("jsonwebtoken");
const Travellers = require("../models/travellers");
const Token = require("../models/token.model");
const bcrypt = require('bcrypt')

const refreshTokenList = [];
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  Travellers.findOne({ email: email })
  .then((user) => {
    if (user) {
      if( bcrypt.compareSync(password, user.password) === true) {

        const accessToken = jwt.sign(
          { first_name: user.first_name, id: user.id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRY }
        );
        const refreshToken = jwt.sign(
          { first_name: user.first_name, id: user.id, role: user.role },
          process.env.REFRESH_TOKEN_SECRET
        );
        refreshTokenList.push(refreshToken);
        const newRefreshToken = new Token({
          token: refreshToken
        })
  
        newRefreshToken.save()
  
        res.json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          first_name: user.first_name,
          id: user.id,
          role: user.role
        });
      } else {
        res.status(400).json("password incorrect");
      }
    } else {
      res.status(400).json("email incorrect");
    }
  });
};

module.exports.refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }
  Token.findOne({ token: refreshToken })
        .then(data => {
            if (data) {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

                    if (err) {
                        res.sendStatus(403);
                    }
                    const accessToken = jwt.sign({
                        username: user.username,
                        role: user.role,
                        user_id: user.user_id
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.TOKEN_EXPIRY
                    });
                    res.json({
                      accessToken: accessToken,
                      
                        first_name: user.first_name,
                        id: user.id,
                        role: user.role
                      
                    });
                    return;
                })
            }
        })
}

module.exports.logout = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.sendStatus(401);
        return;
    }

    Token.findOneAndRemove({ token: refreshToken })
        .then(data => {
            if (data) {
                res.status(200).send({});
            } else {
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("Could not logout user");
        })
}