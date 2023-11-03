import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCatalogComponent } from './components/pokemon-catalog/pokemon-catalog.component';
import { QuestionGameComponent } from './components/question-game/question-game.component';

const routes: Routes = [
  { path: 'catalog', component: PokemonCatalogComponent },
  { path: 'question-game', component: QuestionGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
