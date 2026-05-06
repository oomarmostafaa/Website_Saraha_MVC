import messageModel from "../../dataBase/models/message.model.js";
import QRCode from 'qrcode';

export const user = async(req,res)=>{
    const {id}= req.params
    const {name} = req.session
    const fullURL = req.protocol+'://'+req.get('host')
    const isLogin = req.session.isLogin || false
    const profileLink = `${fullURL}/user/${id}`
    const qrCode = await QRCode.toDataURL(profileLink, { type: 'image/png', width: 260, margin: 2 })

    res.render('user.ejs',{isLogin,id,fullURL,name,profileLink,qrCode})
}

export const handelMessage = async(req,res)=>{
    const {message} =req.body
    const {sendToId} =req.body
    console.log(message,sendToId);
    const newMessage = await messageModel.insertMany({message,sendToId})
    res.redirect(`/user/${sendToId}`)

}