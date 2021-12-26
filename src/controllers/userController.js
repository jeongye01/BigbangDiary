import User from "../models/User";
export const login=async (req,res)=>{
  const pageTitle="Login";
  if(req.method==="GET"){
  return res.render("login",{pageTitle});
  }else{
    const {body:{email,password}}=req;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).render("login",{pageTitle,errorMessage:"존재하지 않는 이메일입니다."});
    }
    const checkPassword=await bcrypt.compare(password,user.password);
    if(!checkPassword){
      return res.status.render("login",{pageTitle,errorMessage:"비밀번호가 틀렸습니다."});
    }
    req.session.loggedIn=true;
    req.session.user=user;
    return res.redirect("/");
  }
}
export const logout=(req,res)=>{
  return res.end();
}
export const join=async (req,res)=>{
  const pageTitle="Join";
  if(req.method==="GET"){
    return res.render("join",{pageTitle});
  }else{
    console.log(req.body);
    const {body:{username,email,password,password2}}=req;
    const exists=await User.exists({$or:[{username},{email}]});
    if(exists){
      return res.status(400).render("join",{
        pageTitle,
        errorMessage:"이미 사용 중인 이름 혹은 이메일입니다."
      });
    }
    if(password!==password2){
      return res.status(400).render("join",{
         pageTitle,
         errorMessage:"비밀번호가 일치 하지 않습니다."
      });
    }
    try{
      await User.create({username,email,password});
      return res.redirect("/login");
    }catch(error){
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: error._message,
      });
    }
    
  }
}
export const seeProfile=(req,res)=>{
  return res.render("seeProfile",{pageTitle:"Profile"});
}
export const editUser=(req,res)=>{
  return res.end();
}
export const deleteUser=(req,res)=>{
  return res.end();
}
