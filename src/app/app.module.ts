import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {CategoriesComponent} from './categories/categories.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';
import {CategoryComponent} from './categories/category/category.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    PageNotFoundComponent,
    CategoriesComponent,
      EditCategoryComponent,
      CategoryComponent
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
