import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailComponent } from './components/pokekon-detail/pokemon-detail.component';
import { PokemonCatalogComponent } from './components/pokemon-catalog/pokemon-catalog.component';
import { QuestionGameComponent } from './components/question-game/question-game.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, provideRouter } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonCatalogComponent,
    QuestionGameComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
