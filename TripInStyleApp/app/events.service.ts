import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
var constants = require('./constants');
import {Category} from "./category";
import {Event} from "./event";

@Injectable()
export class EventsService {
    private getEventFromCategoriesUrl: string = constants.WEBSERVICE_URL + "getEventsByCategory";
    private getEventsCategoriesUrl: string = constants.WEBSERVICE_URL + "getAllCategories";
    private headers = new Headers({ 'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers});
    categoryMenu: Category[] = [];

    constructor(private http: Http) {}

    getCategories() :Promise<Category[]> {
        return this.http.get(this.getEventsCategoriesUrl)
            .toPromise()
            .then(this.convertToCategories)
            .catch(this.handleError);
    }

    getEventsOfCategories(categories: Category[]) : Promise<Event[]> {
        let categoriesTitle = '';
        for(let c of categories) {
            if(categories.indexOf(c) === categories.length-1)
                categoriesTitle += c.title.toLowerCase();
            else
                categoriesTitle += c.title.toLowerCase() + ",";
        }
        console.log(categoriesTitle);
        return this.http.post(this.getEventFromCategoriesUrl,
            JSON.stringify({
                category: categoriesTitle
            }),this.options)
            .toPromise()
            .then(this.convertToEvents)
            .catch(this.handleError);
    }

    private convertToCategories(res) {
        let body = res.json();
        let categories: Category[]= [];
        for(let category of body) {
            categories.push(new Category(category._id, category.title,category.image))
        }
        return categories;
    }
    
    private convertToEvents(res) {
        let body = res.json();
        let events: Event[] = [];
        for(let event of body) {
            events.push(new Event(event._id, event.title, event.description,
                event.state, event.city, event.place, event.startDate,
                event.endDate, event.startTime, event.endTime, event.price,
                event.coin, event.image, event.tickets));
        }
        return events;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}