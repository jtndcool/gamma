export class LoggedUser {
    constructor(private userName:String, private email:String, private password:String,private userId:String, private token:String) {

    }
    getUserName():String {
        return this.userName;
    }
    getToken():String {
        return this.token;
    }
    
}