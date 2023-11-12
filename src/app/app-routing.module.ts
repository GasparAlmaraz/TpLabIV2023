import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCatalogComponent } from './components/pokemon-catalog/pokemon-catalog.component';
import { QuestionGameComponent } from './components/question-game/question-game.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'catalog', component: PokemonCatalogComponent },
  { path: 'question-game', component: QuestionGameComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
