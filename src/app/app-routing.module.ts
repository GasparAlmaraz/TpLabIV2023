import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCatalogComponent } from './components/pokemon-catalog/pokemon-catalog.component';
import { QuestionGameComponent } from './components/question-game/question-game.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: 'catalog', component: PokemonCatalogComponent },
  { path: 'question-game', component: QuestionGameComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'home', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
