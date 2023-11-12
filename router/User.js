const express = require("express");
const userRouter = express.Router();
const JWT = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("../config/passport");
const User = require("../model/User");
// register
userRouter.post("/register", (req, res) => {
    const { username, password, role } = req.body;
    //kiem tra username co ton tai khong
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({
                message: { msgBody: "Error", msgError: true },
            });
        if (user)
            res.status(201).json({
                message: { msgBody: "Ten Dang Nhap Da Ton Tai", msgError: true },
            });
        else {
            const newUser = new User({ username, password, role });
            newUser.save((err) => {
                if (err)
                    res.status(500).json({
                        message: { msgBody: "Error", msgError: true },
                    });
                else
                    res.status(200).json({
                        message: { msgBody: "Tao Tai Khoan Thanh Cong", msgError: false },
                    });
            });
        }
    });
});
const signToken = (userID) => {
    return JWT.sign({
        iss: "tuananh",
        sub: userID,
    },
        "tuananh",
        { expiresIn: "1d" }
    );
};
userRouter.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
        if (req.isAuthenticated()) {
            const { _id, username, role } = req.user;
            const token = signToken(_id);
            res.cookie("access_token", token, { httpOnly: true, sameSite: true });
            res.status(200).json({
                isAuthenticated: true,
                user: { _id, username, role },
            });
        }
    }
);

// logout
userRouter.get(
    "/logout",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.clearCookie("access_token");
        res.json({ user: { username: "", role: "" }, success: true });
    }
);
// kiểm tra đã đăng nhập hay chưa
userRouter.get(
    "/authenticated",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { _id, username, role } = req.user;
        res.status(200).json({
            isAuthenticated: true,
            user: {
                _id,
                username,
                role,
            },
        });
    }
);

// ...

// Sửa thông tin role người dùng
userRouter.put("/updateRole/:id", (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    User.findByIdAndUpdate(userId, { role }, { new: true }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: { msgBody: "Error", msgError: true },
            });
        } else {
            res.status(200).json({
                message: { msgBody: "Cập nhật role thành công", msgError: false },
                user: { _id: user._id, username: user.username, role: user.role },
            });
        }
    });
});


// Lấy tất cả người dùng
userRouter.get("/getAllUsers", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).json({
                message: { msgBody: "Error", msgError: true },
            });
        } else {
            res.status(200).json({
                message: { msgBody: "Lấy danh sách người dùng thành công", msgError: false },
                users: users.map((user) => ({
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                })),
            });
        }
    });
});


module.exports = userRouter;