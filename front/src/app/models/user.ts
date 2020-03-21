export class User{
    constructor(
        public _id: String,
        public name: String,
        public email: String,
        public password: String,
        public image: String,
        public role: String,
        public term: String,
        public count: String,      
        public favorite: Array<any>
    ){}
}
