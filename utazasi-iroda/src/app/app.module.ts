import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import {RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfilComponent } from './components/profil/profil.component';
import { GuidesComponent } from './components/guides/guides.component';
import { CsongradComponent } from './components/csongrad/csongrad.component';
import { CsongradDetailsComponent } from './components/csongrad-details/csongrad-details.component';
import { MyToursComponent } from './components/my-tours/my-tours.component';
import { TravellersComponent } from './components/travellers/travellers.component';
import { ActualToursComponent } from './components/actual-tours/actual-tours.component';
import { NewGuideComponent } from './components/new-guide/new-guide.component';
import { NewTourComponent } from './components/new-tour/new-tour.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProfilComponent,
    GuidesComponent,
    CsongradComponent,
    CsongradDetailsComponent,
    MyToursComponent,
    TravellersComponent,
    ActualToursComponent,
    NewGuideComponent,
    NewTourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
