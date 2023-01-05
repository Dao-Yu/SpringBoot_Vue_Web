import router from "@/router/index";
import storage from "@/util/storage";
router.beforeEach((to,from,next)=>{
    if (to.meta.isLogin){
        let tologin = storage.getSessionObject("loginUser");
        if(tologin===null){
            next({
                name:"Login"
            })
        }else {
            let token = storage.getSessionObject("loginUser").token;
            if(token!=null){
                next();
            }else {
                console.log("进入login页面")
                next({
                    name:"Login"
                })
            }
        }
    }else {
        next();
    }

})