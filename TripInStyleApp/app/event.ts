import {Ticket} from "./ticket";

export class Event {
    _id: string;
    title: string;
    description : string;
    state: string;
    city: string;
    place: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    price: number;
    coin: string;
    image: string;
    tickets: Ticket[] = [];

    constructor(id, title, description, state, city, place, startDate,
                endDate, startTime, endTime, price, coin, image, tickets) {
        this._id=id;
        this.title = title;
        this.description = description;
        this.state = state;
        this.city = city;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.coin = coin;
        this.image = image;
        //TODO - Tickets
    }
}