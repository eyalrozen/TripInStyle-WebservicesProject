export class Category {
    _id: string;
    title : string;
    imgUrl: string;
    selected: boolean = false;
    
    constructor(id, title, imgUrl) {
        this._id = id;
        this.title = title.toUpperCase();
        this.imgUrl = imgUrl;

    }
}