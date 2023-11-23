const express = require("express");
const milkRouter = express.Router();
const passport = require("passport");
const Milk = require("../model/Milk");

//api tao sữa
milkRouter.post(
    "/createMilk",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { name, describe, image, price, supplier, total } = req.body;

        const newMilk = new Milk({ name, describe, image, price, supplier, total });

        newMilk.save((err, result) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(203).json({
                        success: false,
                        message: {
                            msgBody: 'Sản phẩm đã tồn tại',
                            msgError: true,
                        },
                        existMilk: true,
                    });
                }
                return res.status(203).json({
                    success: false,
                    message: {
                        msgBody: 'Có lỗi khi thêm sản phẩm vui lòng nhập đủ thông tin',
                        msgError: true,
                    },
                    err,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: {
                        msgBody: 'Thêm sản phẩm thành công',
                        msgError: false,
                    },
                    result,
                });
            }
        })
    });

//api lay thong tin 1 sản phẩm
milkRouter.post(
    "/getMilk",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { _id } = req.body;
        Milk.findOne({ _id }, (err, result) => {
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
                            msgBody: 'Sản phẩm không có sẵn',
                            msgError: true,
                        },
                        existMilk: false,
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: {
                            msgBody: 'Lấy sản phẩm thành công',
                            msgError: true,
                        },
                        existMilk: true,
                        result,
                    })
                }
            }
        })
    }
)

//api lay all sữa
milkRouter.get(
    "/getAllMilk",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Milk.find((err, result) => {
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
                            msgBody: 'Danh sách sảm phẩm không có sẵn',
                            msgError: true,
                        },
                        existMilk: false,
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: {
                            msgBody: 'Lấy tất cả sản phẩm thành công',
                            msgError: true,
                        },
                        existMilk: true,
                        result,
                    })
                }
            }
        })
    }
)

//api search name

milkRouter.post(
    "/getAllMilk/search",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const search = req.body.search;
        Milk.find((err, result) => {
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
                            msgBody: 'Danh sách sảm phẩm không có sẵn',
                            msgError: true,
                        },
                        existMilk: false,
                    })
                }
                else {
                    result = result.filter(milk => milk.name.toLowerCase().includes(search.toLowerCase()))
                    return res.status(200).json({
                        success: true,
                        message: {
                            msgBody: 'Lấy tất cả sản phẩm theo tìm kiếm thành công',
                            msgError: true,
                        },
                        existMilk: true,
                        result,
                    })
                }
            }
        })
    }
)

//api like, comment sữa
milkRouter.patch(
    "/updateMilk",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const data = ({ _id, name, describe, image, price, supplier, total, star } = req.body);

        const updates = { ...data, star: Array.isArray(data.star) ? data.star : [] };

        const options = { new: true };
        Milk.updateOne({ _id }, updates, options).then((result) => {
            if (result.nModified < 1) {
                return res.status(201).json({
                    success: false,
                    message: {
                        msgBody: 'Có lỗi khi update sản phẩm',
                        msgError: true,
                    },
                })
            }
            return res.status(200).json({
                success: true,
                message: {
                    msgBody: 'Update sản phẩm thành công',
                    msgError: false,
                },
                result,
            })
        }).catch((err) => {
            if (err.code === 11000) {
                return res.status(201).json({
                    success: false,
                    message: {
                        msgBody: 'Sản phẩm đã tồn tại',
                        msgError: true,
                    },
                    existMilk: true,
                })
            }
            return res.status(400).json({
                success: false,
                message: {
                    msgBody: 'Có lỗi khi update sản phẩm',
                    msgError: true,
                },
                err,
            })
        })
    }
)

//api xóa bài hát

milkRouter.delete(
    "/deleteMilk",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { _id } = req.body;
        Milk.deleteOne({ _id }, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: {
                        msgBody: 'Xóa sản phẩm không thành công',
                        msgError: true,
                    },
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: {
                        msgBody: 'Xóa sản phẩm thành công',
                        msgError: false,
                    },
                });
            }
        })
    })

module.exports = milkRouter;