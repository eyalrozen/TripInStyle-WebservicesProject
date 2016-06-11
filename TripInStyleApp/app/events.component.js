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
var EventsComponent = (function () {
    function EventsComponent(eventsService, router) {
        this.eventsService = eventsService;
        this.router = router;
        this.events = [];
        this.filterMenu = false;
    }
    EventsComponent.prototype.changeFilterMenuState = function () {
        this.filterMenu = !this.filterMenu;
    };
    EventsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var selectedCategories = [];
        selectedCategories = this.eventsService.categoryMenu
            .filter(function (cat) { return cat.selected == true; });
        if (selectedCategories.length == 0) {
            var link = ['Categories'];
            this.router.navigate(link);
        }
        this.eventsService.getEventsOfCategories(selectedCategories)
            .then(function (events) {
            _this.events = events;
            console.log(events);
        });
    };
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'events',
            templateUrl: 'html/events.component.html',
            styleUrls: ['css/events.component.css']
        }), 
        __metadata('design:paramtypes', [events_service_1.EventsService, router_deprecated_1.Router])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=events.component.js.map