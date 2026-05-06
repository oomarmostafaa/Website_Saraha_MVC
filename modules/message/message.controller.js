import messageModel from "../../dataBase/models/message.model.js"
import QRCode from 'qrcode'

export const message =async (req,res)=>{
    if (req.session.isLogin) {
        const {name,isLogin,userId} = req.session
        const fullURL = req.protocol+'://'+req.get('host')
       const messages =  await messageModel.find({sendToId:userId})
       const profileLink = `${fullURL}/user/${userId}`
       const qrCode = await QRCode.toDataURL(profileLink, { type: 'image/png', width: 260, margin: 2 })
       console.log(messages);
       res.render('message.ejs',{name,isLogin,userId,fullURL,messages,profileLink,qrCode})
    }else{
        res.redirect('/login')
    }
}

