import {Component, OnInit} from '@angular/core';
import {CategoriesService} from './categories.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    incomeInput = 'income';
    expenseInput = 'expense';
    incomeCategory = [];
    expenseCategory = [];
    isIncomeCategoryLoading = true;
    isExpenseCategoryLoading = true;


    constructor(private categoriesServices: CategoriesService) {
    }

    ngOnInit(): void {

        this.getIncomeCategories();
        this.getExpenseCategories();
    }

    getIncomeCategories() {

        this.categoriesServices.fetchCategoriesByType('income').subscribe(
            categories => {
                this.isIncomeCategoryLoading = false;
                this.incomeCategory = categories;
            }
        );

    }

    getExpenseCategories() {

        this.categoriesServices.fetchCategoriesByType('expense').subscribe(
            categories => {
                this.isExpenseCategoryLoading = false;
                this.expenseCategory = categories;
            }
        );
    }


}

