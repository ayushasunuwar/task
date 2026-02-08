
const dashboard=async(req,res)=>{
    try {
        res.json({success:true,message:'Welcome to your Dashboard'})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

export {dashboard}