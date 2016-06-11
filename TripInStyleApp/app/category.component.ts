import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {Category} from "./category";
import {EventsService} from "./events.service";
var constants = require('./constants');

@Component({
    selector: 'app-categories',
    templateUrl: 'html/categories.html',
    styleUrls: ['css/category.component.css']
})

export class CategoryComponent {
    categoriesMenu: Category[] = [];
    choosenCategories: number = 0;

    constructor(private eventsService: EventsService,
                private router: Router) {
        this.eventsService.getCategories()
            .then(categories => this.categoriesMenu = categories);
    }

    addAtMyCategory(selectedCategory: Category) {
        let category = this.categoriesMenu.find(cat => selectedCategory == cat);
        category.selected = !category.selected;
        if(category.selected)
            this.choosenCategories++;
        else
            this.choosenCategories--;
    }

    getEventsOfSelectedCategories() {
        let link = ['Events'];
        this.router.navigate(link);
        let selectedCategories: Category[] = [];
        selectedCategories = this.categoriesMenu.filter(cat => cat.selected == true);
        constants.myCategories = this.categoriesMenu;
        this.eventsService.categoryMenu = this.categoriesMenu;
        this.eventsService.getEventsOfCategories(selectedCategories)
            .then(events => {
                console.log(events);
            });
    }
}