export const localMiddleware=(req,res,next)=>{
  res.locals.loggedIn=Boolean(req.session.loggedIn);
  res.locals.siteName="BigbangDiary";
  res.locals.loggedInUser=req.session.user || {};
  next();
}

export const protectedMiddleware=(req,res,next)=>{
  if(req.session.loggedIn){
    return next();
  }else{
    return res.redirect("/");
  }
}