const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userCtrl = {};

const secret = 'Esto-Es-UnA-PalbR@_SecretA12341267'

const Users = require('../models/Users');


userCtrl.signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const oldUser= await Users.findOne({email});
        if(!oldUser) return res.status(400).json({message: 'User does not exist'});

         const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message: 'Invalid Credentials'});
         const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "10h" });

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

userCtrl.signup = async (req, res) => {
    const { email, password, firstName, lastName, roll } = req.body;

    try {
         const oldUser = await Users.findOne({email});

         if (oldUser) return res.status(400).json({ message: "User already exists" });

          const hashedPassword = await bcrypt.hash(password, 12);

          const result = await Users.create({ roll, email, password: hashedPassword, name: `${firstName} ${lastName}` });

          const token = jwt.sign( {email: result.email, id: result._id }, secret, {expiresIn: "10h"} );

          res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    
        console.log(error);
        
    }
};


module.exports = userCtrl;