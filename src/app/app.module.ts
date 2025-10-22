import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }