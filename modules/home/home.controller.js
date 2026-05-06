

export const home = (req,res)=>{
    const isLogin = req.session.isLogin || false
    res.render('home.ejs',{isLogin})
}