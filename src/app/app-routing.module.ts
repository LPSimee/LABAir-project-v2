import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "shoes", component: ShoeListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
