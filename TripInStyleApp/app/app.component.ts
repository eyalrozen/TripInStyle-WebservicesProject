import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from
    '@angular/router-deprecated';

import { CategoryComponent } from './category.component';
import {EventsService} from "./events.service";
import {EventsComponent} from "./events.component";

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
        EventsService
    ]
})

@RouteConfig([
    {
        path: '/categories',
        name: 'Categories',
        component: CategoryComponent,
        useAsDefault: true
    },
    {
        path: '/events',
        name: 'Events',
        component: EventsComponent
    }
])

export class AppComponent { }
