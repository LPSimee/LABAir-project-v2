import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "shoes", component: ShoeListComponent },
    { path: "product/s/:id", component: ProductDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
