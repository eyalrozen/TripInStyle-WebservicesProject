"use strict";
var Event = (function () {
    function Event(id, title, description, state, city, place, startDate, endDate, startTime, endTime, price, coin, image, tickets) {
        this.tickets = [];
        this._id = id;
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
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map