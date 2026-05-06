import userModel from "../../dataBase/models/user.model.js"
import Joi from 'joi'
import bcrypt from 'bcrypt'

const RegisterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid address'
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,30}$')).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must be 6-30 characters and include letters and numbers'
    }),
    PasswordConfirmation: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': 'Password confirmation does not match password',
        'any.required': 'Password confirmation is required'
    })
})

const LoginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid address'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required'
    })
})

export const login =(req,res)=>{
    const isLogin = req.session.isLogin || false
    res.render('login.ejs',{isLogin,error:req.flash('error of login')})
}
export const register =(req,res)=>{
    const isLogin = req.session.isLogin || false
    res.render('register.ejs',{isLogin,error:req.flash('info'),isExisted:req.flash('isExisted')})
}

export const handleRegister = async (req,res)=>{
    const { name, email, password } = req.body
    const { error } = RegisterSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const messages = error.details.map(detail => detail.message)
        req.flash('info', messages)
        return res.redirect('/register')
    }

    const user = await userModel.findOne({ email })
    if (user) {
        req.flash('isExisted', 'Email already exists, please login or use another email')
        return res.redirect('/register')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await userModel.create({ name, email, password: hashedPassword })
    res.redirect('/login')
}

export const handleLogin = async (req,res)=>{
    const { email, password } = req.body
    const { error } = LoginSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const messages = error.details.map(detail => detail.message)
        req.flash('error of login', messages)
        return res.redirect('/login')
    }

    const user = await userModel.findOne({ email })
    if (!user) {
        req.flash('error of login', ['Email or password is incorrect'])
        return res.redirect('/login')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        req.flash('error of login', ['Email or password is incorrect'])
        return res.redirect('/login')
    }

    const hour = 3600000 * 48
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = hour
    req.session.userId = user._id
    req.session.name = user.name
    req.session.isLogin = true
    res.redirect('/message')
}
