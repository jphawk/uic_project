class DataModule{
	constructor(){
		this.translation = 'boo';
		this.logins = [{user: 'user@a.com', password: 'pass', type: 'requester'}, {user: 'translator@a.com', password: 'password', type: 'translator'}];
		
		this.loggedIn = "";
	}
}

export default (new DataModule);