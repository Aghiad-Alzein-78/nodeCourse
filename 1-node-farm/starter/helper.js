class Helper {
    constructor(req) {
        this.req = req;
    }
    ref(){
        // print(this.req.headers.referer)
        return this.req.headers.referer;
    }
    url(){
        return this.ref();
    }
    protocol(){
        return this.ref().split(":")[0];
    }
    host(){
        return this.req.headers.host;
    }
    getParameterValue(paraString){
        const baseUrl=this.protocol()+"://"+this.host();
        console.log(baseUrl)
        console.log(this.ref())
        console.log(this.host())
        console.log(this.req)
        return (new URL(this.ref(),baseUrl).searchParams) ;
    }
}

module.exports=Helper;