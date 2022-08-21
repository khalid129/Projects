const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sentToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User 
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder : "avatars",
        width : 150,
        crop : "scale",
    })

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : myCloud.public_id,
            url : myCloud.secure_url,
        },
    });

    sentToken(user,201,res);
});

// Login User

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter email",404))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid  Email or password",401));
    }

    sentToken(user,200,res);
});


// Logout User 

exports.logOut = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success : true,
        message : "Logged out successfuly"
    })
})


// Forgot Password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get Resetpassword token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If your have not requested this email then, please ignore it`;

    console.log(message)

    res.status(200).json({
        message
    })
    // try{
    //     await sendEmail({
    //         email : user.email,
    //         subject : 'Ecommerce password recovery',
    //         message
    //     });

    //     res.status(200).json({
    //         success : true,
    //         message : `Email sent to ${user.email} successfuly`,
    //     })

    // }catch(error){
    //     user.resetPasswordToken = undefined;
    //     user.resetPasswordExpire = undefined;
         
    //     await user.save({validateBeforeSave : false});

    //     return next(new ErrorHandler(error.message, 500));
    // }
});

// Reset Password

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    console.log(resetPasswordToken);

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password Does not match with current password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sentToken(user,200,res)
})

// User Detail

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user
    })

})

// Update User Password 

exports.updatePassword= catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sentToken(user,200,res);

})

// Update User Profile 

exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
    };

    // We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new :true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success :true,
        user
    });

});

// Get All user (Admin)

exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success : true,
        users,
    });
});

// Get Single User datail (Admin)

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exits with Id:${req.params.id}`,404));
    }

    res.status(200).json({
        success : true,
        user
    })

})

// Update User role (Admin)

exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new :true,
        runValidators: true,
        useFindAndModify: false
    });

    if(!user){
        return next(new ErrorHandler(`User does not Exit with this ${req.params.id}`,404))
    }

    res.status(200).json({
        success :true,
        user
    });

});

// Delete User (Admin)

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.params.id);
    
     // We will delete cloudinary later

    if(!user){
        return next(new ErrorHandler(`User does not exist with this ${req.params.id}`,404))
    }

    await user.remove();

    res.status(200).json({
        success :true,
        message : "User Deleted successfuly"
    });

});