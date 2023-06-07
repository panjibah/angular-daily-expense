import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {CategoriesComponent} from './categories/categories.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';
import {CategoryComponent} from './categories/category/category.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthInterceptor} from './auth.interceptor';
import {CategoriesService} from './categories/categories.service';
import {AuthService} from './auth.service';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { EditTableComponent } from './home/edit-table/edit-table.component';





@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    PageNotFoundComponent,
    CategoriesComponent,
      EditCategoryComponent,
      CategoryComponent,
      LoginComponent,
      LogoutComponent,
    IncomeComponent,
    ExpenseComponent,
    EditTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],

  providers: [CategoriesService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
