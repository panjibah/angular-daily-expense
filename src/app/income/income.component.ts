import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppModel } from '../app.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeForm !: FormGroup;
  categoryList = [];
  constructor(private postService: PostService, private router:Router) { }

  ngOnInit(): void {
    this.incomeForm = new FormGroup({
      'date':new FormControl(null, [Validators.required]), 
      'category':new FormControl(null, [Validators.required]),
      'amount':new FormControl(null, [Validators.required]),
      'description':new FormControl(null, [Validators.required]),

    });
    this.fetchComponentList();
  }
  //onCreateIncome(postData: { date: string; category: string; amount: string; description: string;}){
    onCreateIncome(){
      let postData: AppModel = {date: this.incomeForm.controls['date'].value, category: this.incomeForm.controls['category'].value, 
      amount: this.incomeForm.controls['amount'].value, description: this.incomeForm.controls['description'].value, type: 'income'};
    this.postService.onCreateData(postData).subscribe(
      (data)=> {
        //console.log(data);
        this.onBack();
      }
    );    
  }

  onBack(){
    this.router.navigate(['']);
  }

  fetchComponentList(){
    this.postService.fetchComponentList()
    .subscribe(
      posts => {
        posts.forEach(item => {
          if(item.type==='income') this.categoryList.push({'name' : item.name});
        });
        //this.categoryList = posts;
        //console.log(posts);
        //console.log('HASIL PUSH FOREACH : '+this.categoryList);
      }, error => { //ini macam catch nya
        console.log(error);
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
