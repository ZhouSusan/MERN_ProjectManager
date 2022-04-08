const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

module.exports = {
    signup: async (req, res) => {

        const user = req.body;

        const usernameTaken = await User.findOne({username : user.username});
        const emailTaken = await User.findOne({email : user.email});

        if(usernameTaken || emailTaken) {
            res.json({message: "Username or email is taken"});
        } else if (user.password != user.confirmpassword) {
            res.json({message: "Passwords do not match."})
        } else {
            user.password = await bcrypt.hash(req.body.password, 10);
            const dbUser = new User({
                username: user.username.toLowerCase(),
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email.toLowerCase(),
                password: user.password,
            })

            dbUser.save();
            res.json({message: "PogO"});
        }
    },


    login: (req , res) => {
        const userLoggingIn = req.body;

        console.log("logging in");

        User.findOne({username: userLoggingIn.username})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid Username or Password!"});
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(auth => {
                if(auth) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username
                    }
                    jwt.sign(
                        payload,
                        // process.env.JWT_SECRET,
                        "widepeepohappy",
                        {expiresIn: 86400},
                        (err,token) => {
                            if(err) {
                                return res.json({message: err})
                            } else {
                                return res.json({message: "Success", token: "Bearer " + token})
                            }
                        }
                    )
                } else {
                    return res.json({message : "Invalid Username or Password!"})
                }
            })
        })
    },

    logoff: (req, res) => {
        res.json({message : "Loggedoff", token: ""})
    },

    isUserAuth: (req, res) => {
        return res.json({isLoggedIn : true, username : req.user.username})
    },

    verifyJWT(req, res, next) {
        const token = req.headers["x-access-token"]?.split(' ')[1];

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    return res.json({
                        isLoggedIn: false,
                        message: "Failed to authenticate."
                    })
                }
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                next();
            })
        } else {
            return res.json({message: "Incorrect Token Given", isLoggedIn: false});
        }
    }
}

