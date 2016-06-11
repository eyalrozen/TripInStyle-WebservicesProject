import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {EventsService} from "./events.service";
import {Category} from "./category";
import { Event } from './event';

@Component({
    selector: 'events',
    templateUrl: 'html/events.component.html',
    styleUrls: ['css/events.component.css']
})

export class EventsComponent implements OnInit {
    events: Event[] = [];
    private filterMenu: boolean = false;
    
    constructor(private eventsService: EventsService,
                private router: Router) {

    }

    changeFilterMenuState() {
        this.filterMenu = !this.filterMenu;
    }

    ngOnInit() {
        let selectedCategories: Category[] = [];
        selectedCategories = this.eventsService.categoryMenu
            .filter(cat => cat.selected == true);
        if(selectedCategories.length == 0) {
            let link = ['Categories'];
            this.router.navigate(link);
        }
        this.eventsService.getEventsOfCategories(selectedCategories)
            .then(events => {
                this.events = events;
                console.log(events);
            });
    }
}