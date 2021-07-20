class Lib{
    static encodeEmail(val){
        return val.split(".").join("*");
    }

    static decodeEmail(val){
        return val.split("*").join(".");
    }
}

export default Lib;