import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {HomeComponent} from './home/home.component';
import {HistoryComponent} from './history/history.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {ExpenseComponent} from './expense/expense.component';
import {IncomeComponent} from './income/income.component';
import { EditTableComponent } from './home/edit-table/edit-table.component';
import {LogoutComponent} from './logout/logout.component';
import {IsSignInGuard} from './guard/is-sign-in.guard';

const routes: Routes = [
    {path: '',canActivate: [AuthGuard], component: HomeComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'income',  canActivate: [AuthGuard] ,component: IncomeComponent},
    {path: 'expenses',  canActivate: [AuthGuard] ,component: ExpenseComponent},
    {path: 'income',  canActivate: [AuthGuard] ,  component: IncomeComponent},
    {path: 'expenses',  canActivate: [AuthGuard] ,  component: ExpenseComponent},
    {path: 'history',  canActivate: [AuthGuard] , component: HistoryComponent},
    {path: 'login', canActivate: [IsSignInGuard],component: LoginComponent},

    {path: 'edit/:id', canActivate: [AuthGuard] ,component: EditTableComponent},
    {
        path: 'categories',canActivate: [AuthGuard], component: CategoriesComponent, children: [
            {path: ':name', component: EditCategoryComponent}
        ]
    },
    {path: 'not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/not-found'},


];




@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
