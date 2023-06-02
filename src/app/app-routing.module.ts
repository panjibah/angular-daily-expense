import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {HomeComponent} from './home/home.component';
import {HistoryComponent} from './history/history.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EditCategoryComponent} from './categories/edit-category/edit-category.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'income', component: HomeComponent},
    {path: 'expenses', component: HomeComponent},
    {path: 'history', component: HistoryComponent},
    {
        path: 'categories', component: CategoriesComponent, children: [
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
