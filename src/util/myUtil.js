class myUtil{
    constructor(){
        this.serverProtocol =   "http://"
        this.serverName     =   "localhost"
        this.serverPortNum  =   ":8090"
        this.projectName    =   "AkashicRecords"
        this.dummyPath      =   "hello"
        this.imgPrefix      =   this.serverProtocol + this.serverName + this.serverPortNum+'/'+this.projectName+'/'
        this.serverUrl      =   this.serverProtocol + this.serverName + this.serverPortNum+'/'+this.projectName+'/'+this.dummyPath+'/';
    }
}
export default myUtil;