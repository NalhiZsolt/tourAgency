import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualToursComponent } from './components/actual-tours/actual-tours.component';
import { CsongradDetailsComponent } from './components/csongrad-details/csongrad-details.component';
import { CsongradComponent } from './components/csongrad/csongrad.component';
import { GuidesComponent } from './components/guides/guides.component';
import { LoginComponent } from './components/login/login.component';
import { MyToursComponent } from './components/my-tours/my-tours.component';
import { NewGuideComponent } from './components/new-guide/new-guide.component';
import { NewTourComponent } from './components/new-tour/new-tour.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TravellersComponent } from './components/travellers/travellers.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'actual-tours', component: ActualToursComponent},
  {path: 'travellers', component: TravellersComponent, canActivate: [AuthGuardService, RoleGuardService], data: { expectedRole: 2 } },
  {path: 'guides', component: GuidesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-tours', component: MyToursComponent, canActivate: [AuthGuardService]},
  {path: 'new-tour', component: NewTourComponent, canActivate: [AuthGuardService, RoleGuardService], data: { expectedRole: 2 } },
  {path: 'new-guide', component: NewGuideComponent, canActivate: [AuthGuardService, RoleGuardService], data: { expectedRole: 2 } },
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'csongrad', component: CsongradComponent},
  {path: 'csongrad-details', component: CsongradDetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
