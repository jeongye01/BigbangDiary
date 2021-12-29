import User from "../models/User";
import bcrypt from "bcrypt";
export const login=async (req,res)=>{
  const pageTitle="Login";
  if(req.method==="GET"){
  return res.render("user/login",{pageTitle});
  }else{
    const {body:{email,password}}=req;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).render("user/login",{pageTitle,errorMessage:"존재하지 않는 이메일입니다."});
    }
    const checkPassword=await bcrypt.compare(password,user.password);
    if(!checkPassword){
      return res.status(400).render("user/login",{pageTitle,errorMessage:"비밀번호가 틀렸습니다."});
    }
    req.session.loggedIn=true;
    req.session.user=user;
    return res.redirect("/");
  }
}




export const logout=(req,res)=>{
  req.session.destroy();
  return res.redirect("/");
}



export const join=async (req,res)=>{
  const pageTitle="Join";
  if(req.method==="GET"){
    return res.render("user/join",{pageTitle});
  }else{
    console.log(req.body);
    const {body:{username,email,password,password2}}=req;
    const exists=await User.exists({$or:[{username},{email}]});
    if(exists){
      return res.status(400).render("user/join",{
        pageTitle,
        errorMessage:"이미 사용 중인 이름 혹은 이메일입니다."
      });
    }
    if(password!==password2){
      return res.status(400).render("user/join",{
         pageTitle,
         errorMessage:"비밀번호가 일치 하지 않습니다."
      });
    }
    try{
      await User.create({username,email,password});
      return res.redirect("/login");
    }catch(error){
      return res.status(400).render("user/join", {
        pageTitle,
        errorMessage: error._message,
      });
    }
    
  }
}



export const seeProfile=(req,res)=>{
  return res.render("user/seeProfile",{pageTitle:"Profile"});
}



export const editUser=async (req,res)=>{
  const pageTitle="Edit Profile"
  if(req.method==="GET"){
    return res.render("user/editProfile",{pageTitle});
  }else{
    const {
      session:{user:{_id,avatarUrl}},
      body:{username,email},
      file
    }=req;
    try{const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        avatarUrl: file ? file.path : avatarUrl,
        email,
        username,
      },
      { new: true }
    );
    req.session.user=updatedUser;
    return res.redirect("/user/_id");}
    catch(error){
     
      return res.render("user/editProfile",{pageTitle,errorMessage:"예기치 못한 오류가 발생했습니다."})
    }
  }
}



export const deleteUser=async (req,res)=>{
  const {session:{user:{_id}}}=req;
  await User.findByIdAndRemove(_id);
  req.session.destroy();
  return res.redirect("/");
}




export const changePassword=async (req,res)=>{
  const pageTitle="Change Password";
  if(req.method==="GET"){
    return res.render("user/changePassword",{pageTitle});
  }else{
    const {
      session:{
        user:{_id}
      },
      body:{oldPassword,newPassword,newPassword2}
    }=req;
    const user=await User.findById(_id);
    const secureOk=await bcrypt.compare(oldPassword,user.password);
    if(!secureOk){
      return res.status(400).render("user/changePassword",{pageTitle,errorMessage:"현재 비밀번호가 틀렸습니다."});
    }
    if(newPassword!==newPassword2){
      return res.status(400).render("user/changePassword", {
        pageTitle,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
    }
    user.password=newPassword;
    await user.save();
    return res.redirect("/logout");
  }
}
