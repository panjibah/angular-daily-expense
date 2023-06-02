import { Component, OnInit } from '@angular/core';
import {Category} from '../category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  loadedCategory =[];
  constructor() { }

  ngOnInit(): void {}


  addCategory(cat : Category){
    // const category : Category;
    // category.type = cat.type;
    // category.name = cat.name;
    // this.loadedCategory.push(category);
    // console.log(this.loadedCategory);
  };

  deleteCategory(){
  };

  fetchCategory(){
  };

  getAllCategory(){
    return this.loadedCategory;
  };



}
