import { Routes } from '@angular/router';
import { HomePageComponent } from './Contacts/pages/home-page/home-page.component';
import { InfoComponent } from './Contacts/pages/info/info.component';
import { LayoutContactComponent } from './Contacts/layout/layout-contact/layout-contact.component';

export const routes: Routes = [
    {
        path: '', component: LayoutContactComponent,
        children: [
            {
                path: 'home', component: HomePageComponent
            },
            {
                path: 'info/:id', component: InfoComponent
            },
            {
                path: '**', redirectTo: 'home'
            }
        ]
    },

    {
        path: '**', redirectTo: ''
    }
];
