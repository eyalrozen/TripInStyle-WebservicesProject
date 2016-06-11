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
var router_deprecated_1 = require('@angular/router-deprecated');
var events_service_1 = require("./events.service");
var constants = require('./constants');
var CategoryComponent = (function () {
    function CategoryComponent(eventsService, router) {
        var _this = this;
        this.eventsService = eventsService;
        this.router = router;
        this.categoriesMenu = [];
        this.choosenCategories = 0;
        this.eventsService.getCategories()
            .then(function (categories) { return _this.categoriesMenu = categories; });
    }
    CategoryComponent.prototype.addAtMyCategory = function (selectedCategory) {
        var category = this.categoriesMenu.find(function (cat) { return selectedCategory == cat; });
        category.selected = !category.selected;
        if (category.selected)
            this.choosenCategories++;
        else
            this.choosenCategories--;
    };
    CategoryComponent.prototype.getEventsOfSelectedCategories = function () {
        var link = ['Events'];
        this.router.navigate(link);
        var selectedCategories = [];
        selectedCategories = this.categoriesMenu.filter(function (cat) { return cat.selected == true; });
        constants.myCategories = this.categoriesMenu;
        this.eventsService.categoryMenu = this.categoriesMenu;
        this.eventsService.getEventsOfCategories(selectedCategories)
            .then(function (events) {
            console.log(events);
        });
    };
    CategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-categories',
            templateUrl: 'html/categories.html',
            styleUrls: ['css/category.component.css']
        }), 
        __metadata('design:paramtypes', [events_service_1.EventsService, router_deprecated_1.Router])
    ], CategoryComponent);
    return CategoryComponent;
}());
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map