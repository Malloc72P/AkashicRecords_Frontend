class myUtil{
    constructor(){
        this.serverProtocol =   "http://"
        this.serverName     =   "skynet765.iptime.org"
        this.serverPortNum  =   ":40346"
        this.projectName    =   "AkashicRecords"
        this.dummyPath      =   "hello"
        this.imgPrefix      =   this.serverProtocol + this.serverName + this.serverPortNum+'/'+this.projectName+'/'
        this.serverUrl      =   this.serverProtocol + this.serverName + this.serverPortNum+'/'+this.projectName+'/'+this.dummyPath+'/';
    }
}
export default myUtil;