const jwt = require('jsonwebtoken');

const secret = 'Esto-Es-UnA-PalbR@_SecretA12341267'




auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = auth;