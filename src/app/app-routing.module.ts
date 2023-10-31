import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCatalogComponent } from './components/pokemon-catalog/pokemon-catalog.component';

const routes: Routes = [
  { path: 'catalog', component: PokemonCatalogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
