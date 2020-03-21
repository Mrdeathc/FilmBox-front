export class Episode{
    constructor(
        public _id: String,
        public series: String,
        public season: String,
        public episode: String,
        public title: String,
        public duration: String,
        public date: String,
        public synopsis: String,
        public image: String,      
        public link: String
    ){}
}