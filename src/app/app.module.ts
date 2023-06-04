import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IncomeComponent } from './income/income.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseComponent } from './expense/expense.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';


const appRoutes: Routes= [
  {path: '', component:HomeComponent},
  {path: 'income', component:IncomeComponent},
  {path: 'expenses', component:ExpenseComponent},
  {
    path: 'categories', component: CategoriesComponent, children: [
        {path: ':name', component: EditCategoryComponent}
    ]
},
  {path: 'history', component:HistoryComponent},
  {path: 'report', component:HomeComponent},

  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    PageNotFoundComponent,
    CategoriesComponent,
    EditCategoryComponent,
    IncomeComponent,
    ExpenseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
