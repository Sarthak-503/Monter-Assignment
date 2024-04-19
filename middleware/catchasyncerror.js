module.exports = theFunc =>(req,res,next)=>{
    //try                                 //catch block
    Promise.resolve(theFunc(req,res,next)).catch(next);
}