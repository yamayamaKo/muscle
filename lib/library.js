class Lib{
    static encodeEmail(val){
        return val.split(".").join("*");
    }

    static decodeEmail(val){
        return val.split("*").join(".");
    }

    static choiceImage(user_status){
        if (user_status.arm >= 80){
            if (user_status.chest >= 80){
                if(user_status.leg >= 80){
                    return "perfect.png"
                }else {
                    return "arm&chest.png"
                }
            }
            else {
                if(user_status.leg >= 80){
                    return "arm&leg.png"
                }else{
                    return "arm.png"
                }
            }
        }
        else {
            if (user_status.chest >= 80){
                if (user_status.leg >= 80) {
                    return "chest&leg.png"
                }
                else {
                    return "chest.png"
                }
            }else {
                if (user_status.leg >= 80){
                    return "leg.png"
                }else{
                    if (user_status.exp >= 100){
                        return "nomal.png"
                    }else {
                        return "thin.png"
                    }
                }
            }
        }
    }
}

export default Lib;