"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var constants = require('./constants');
var category_1 = require("./category");
var event_1 = require("./event");
var EventsService = (function () {
    function EventsService(http) {
        this.http = http;
        this.getEventFromCategoriesUrl = constants.WEBSERVICE_URL + "getEventsByCategory";
        this.getEventsCategoriesUrl = constants.WEBSERVICE_URL + "getAllCategories";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.categoryMenu = [];
    }
    EventsService.prototype.getCategories = function () {
        return this.http.get(this.getEventsCategoriesUrl)
            .toPromise()
            .then(this.convertToCategories)
            .catch(this.handleError);
    };
    EventsService.prototype.getEventsOfCategories = function (categories) {
        var categoriesTitle = '';
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var c = categories_1[_i];
            if (categories.indexOf(c) === categories.length - 1)
                categoriesTitle += c.title.toLowerCase();
            else
                categoriesTitle += c.title.toLowerCase() + ",";
        }
        console.log(categoriesTitle);
        return this.http.post(this.getEventFromCategoriesUrl, JSON.stringify({
            category: categoriesTitle
        }), this.options)
            .toPromise()
            .then(this.convertToEvents)
            .catch(this.handleError);
    };
    EventsService.prototype.convertToCategories = function (res) {
        var body = res.json();
        var categories = [];
        for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
            var category = body_1[_i];
            categories.push(new category_1.Category(category._id, category.title, category.image));
        }
        return categories;
    };
    EventsService.prototype.convertToEvents = function (res) {
        var body = res.json();
        var events = [];
        for (var _i = 0, body_2 = body; _i < body_2.length; _i++) {
            var event_2 = body_2[_i];
            events.push(new event_1.Event(event_2._id, event_2.title, event_2.description, event_2.state, event_2.city, event_2.place, event_2.startDate, event_2.endDate, event_2.startTime, event_2.endTime, event_2.price, event_2.coin, event_2.image, event_2.tickets));
        }
        return events;
    };
    EventsService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EventsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map