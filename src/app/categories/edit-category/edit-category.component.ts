import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../category.model';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../categories.service';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
    categoryName: any = 'dsd';
    @Input() type ='';
     @ViewChild('ngFormRef') form?: NgForm;


    loadedCategory = [];
    categoryType = '';
    categoryTitle ='';

    constructor(private route: ActivatedRoute, private categoryService : CategoriesService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(
            (params) => {
                this.categoryType = params.name;

            }
        );
    }

    onSubmit(elementRef: NgForm) {
        //console.log('categoryType ' + this.categoryType);
        const cat: Category = {name: '', type: ''};
        cat.name = elementRef.value.name;
        console.log(this.type);

        cat.type = this.type;
        cat.name = elementRef.value.name;
        this.categoryService.onCreatePost(cat).subscribe(
            (response) =>{
                console.log(response);

            }
        );

    }

}
