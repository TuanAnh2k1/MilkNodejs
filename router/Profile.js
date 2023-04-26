const express = require("express");
const profileRouter = express.Router();
const passport = require("passport");
const Profile = require("../model/Profile");

//Tạo hồ sơ cá nhân
profileRouter.post(
    "/createProfile",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {
            name,
            birthday,
            sdt,
            email,
            address,
            gender,
            account,
        } = req.body;
        const newProfile = new Profile({
            name,
            birthday,
            sdt,
            email,
            address,
            gender,
            account,
        });

        newProfile.save((err, result) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(203).json({
                        success: false,
                        message: {
                            msgBody: 'Email đã được tạo hồ sơ',
                            msgError: true,
                        },
                        existEmail: true,
                    });
                }
                return res.status(203).json({
                    success: false,
                    message: {
                        msgBody: 'Có lỗi khi tạo hồ sơ, vui lòng nhập đủ các trường thông tin',
                        msgError: true,
                    },
                    err,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: {
                        msgBody: 'Tạo hồ sơ thành công',
                        msgError: false,
                    },
                    result,
                });
            }
        });

    }
);

//Lấy thông tin hồ sơ theo tài khoản
profileRouter.post(
    "/getProfile",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const account = req.body;
        Profile.findOne({ account }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: {
                        msgBody: 'Có lỗi khi lấy dữ liệu',
                        msgError: true,
                    },
                    err,
                })
            }
            else {
                if (!result) {
                    return res.status(201).json({
                        success: false,
                        message: {
                            msgBody: 'Tài khoản không có sẵn',
                            msgError: true,
                        },
                        existProfile: false,
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: {
                            msgBody: 'Lấy tài khoản thành công',
                            msgError: false,
                        },
                        existProfile: true,
                        result,
                    })
                }
            }
        })
    }
)

//Cập nhật hồ sơ cá nhân
profileRouter.patch(
    "/updateProfile",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const data = ({
            _id,
            name,
            birthday,
            sdt,
            email,
            address,
            gender,
            account,
        } = req.body);

        const updates = data;
        const options = { new: true };
        Profile.updateOne({ _id }, updates, options).then((result) => {
            if (result.nModified < 1) {
                return res.status(201).json({
                    success: false,
                    message: {
                        msgBody: 'Có lỗi khi update hồ sơ',
                        msgError: true,
                    },
                })
            }
            return res.status(200).json({
                success: true,
                message: {
                    msgBody: 'Update hồ sơ thành công',
                    msgError: false,
                },
                result,
            })
        }).catch((err) => {
            if (err.code === 11000) {
                return res.status(201).json({
                    success: false,
                    message: {
                        msgBody: 'Email đã tồn tại',
                        msgError: true,
                    },
                    existEmail: true,
                })
            }
            return res.status(400).json({
                success: false,
                message: {
                    msgBody: 'Có lỗi khi update hồ sơ',
                    msgError: true,
                },
                err,
            })
        })
    }
)

//Xóa hồ sơ
profileRouter.delete(
    "/deleteProfile",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const account = req.body;
        Profile.deleteOne({ account }, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: {
                        msgBody: 'Xóa hồ sơ không thành công',
                        msgError: true,
                    },
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: {
                        msgBody: 'Xóa hồ sơ thành công',
                        msgError: false,
                    },
                });
            }
        })
    }
)


module.exports = profileRouter;