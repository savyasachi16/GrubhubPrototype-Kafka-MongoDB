import express from 'express';
import passport from 'passport';
import {
    multerUploads,
    dataUri
} from '../config/multer';
import {
    cloudinaryConfig
} from '../config/cloudinary'

const userRouter = express.Router();

userRouter.post('/login', passport.authenticate('login'), (req, res) => {
    console.log('Inside POST user login');
    console.log('Request Body: ', req.body);

    kafka.make_request("loginUser", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('User Logged in');
        }
    });
});

userRouter.post('/register', passport.authenticate('register'), (req, res) => {
    console.log('Inside POST user register');
    console.log('Request Body: ', req.body);

    kafka.make_request("registerUser", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('User Registered');
        }
    });
});

userRouter.get("/user/:user_id", (req, res) => {
    console.log('Inside GET user');

    kafka.make_request("getUser", req.params.user_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Fetched user');
        }
    });

});

userRouter.put("/userUpdate/:user_id", passport.authenticate("jwt"), (req, res) => {
    console.log('Inside PUT user update');
    console.log('Request Body: ', req.body);

    const userDetails = req.body;
    userDetails.user_id = req.params.user_id;

    kafka.make_request("updateUser", userDetails, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('User updated');
        }
    });

});

userRouter.post("/upload/image", multerUploads, cloudinaryConfig, (req, res) => {
    console.log('Inside POST user upload image');
    console.log('Request Body: ', req.body);
    let file;
    if (req.file) {
        file = dataUri(req).content;
    } else {
        res.status(400).json({
            message: 'File not uploaded!'
        });
    }
    kafka.make_request("uploadImage", file, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Image uploaded');
        }
    });

});

export default userRouter;