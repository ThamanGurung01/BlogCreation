const {Router}=require("express");
const User=require("../models/user");
const router=Router();

router.get("/signin",(req,res)=>{
  res.render("signin");
});
router.get("/signup",(req,res)=>{
  res.render("signup");
});

router.post("/signin",async(req,res)=>{
 try{
  const {email,password}=req.body;
  const token=await User.matchPasswordAndGenerateToken(email,password);
  // console.log("Token",token);
  return res.cookie("token",token).redirect("/");
 }catch(error){
return res.render("signin",{
  error:"Incorrect Email or Password",
});
 }
});

router.post("/signup",async(req,res)=>{
  const {fullName,email,password}=req.body;
  // console.log(email);
  await User.create({
    fullName,email,password,
  }).then(e=>console.log("successfull"));
  return res.redirect("/");
});

router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/");
})



module.exports=router;