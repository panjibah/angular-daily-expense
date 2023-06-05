import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { AppModel } from 'src/app/app.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  editForm !: FormGroup;
  id: string;
  categoryList = [];
  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log("WAWAWAWAWA " + params['id']);
        this.id = params['id'];
      }
    );
    console.log("0000");
    this.editForm = new FormGroup({
      'date':new FormControl(null, [Validators.required]), 
      'category':new FormControl(null, [Validators.required]),
      'amount':new FormControl(null, [Validators.required]),
      'description':new FormControl(null, [Validators.required]),  
      'type'  : new FormControl(null),
      'id'  : new FormControl(null),
    });
      console.log("ABCD");
    this.postService.fetchSingleValue(this.id).subscribe(
      posts => {
        console.log("EFGH");
        posts.forEach(item => {
        console.log("IJKLM");
        this.editForm.patchValue({'date':item.date, 
          'amount':item.amount,
          'description':item.description,  
          'type'  : item.type,
          'category' : item.category,
          'id' : item.id });
          console.log("NOPQ");  
          
          this.fetchComponentList(item.type);
        })
        
        
        console.log(posts);
      }, error => { //ini macam catch nya
        console.log(error);
      }
    );

      
        

  }

  onUpdateTransaction(){
    let postData: AppModel = {date: this.editForm.controls['date'].value, category: this.editForm.controls['category'].value, 
    amount: this.editForm.controls['amount'].value, description: this.editForm.controls['description'].value, type: 'expense', id:this.editForm.controls['id'].value };
    this.postService.onUpdateData(postData).subscribe(
      (data)=> {
        console.log(data);
        //this.fetchPosts();
        this.onBack();
      }
    );  
  }

  onBack(){
    this.router.navigate(['']);
  }

  fetchComponentList(type: string){
    this.postService.fetchComponentList()
    .subscribe(
      posts => {
        posts.forEach(item => {
          if(item.type===type) this.categoryList.push({'name' : item.name});
        });
        //this.categoryList = posts;
        console.log(posts);
        console.log('HASIL PUSH CAT LIST DI FETCH COMPONENT LIST : '+this.categoryList);

        let j = 0;
        console.log("CAT LIST : "+this.categoryList);
        console.log("CATEGORY YG UD D SET DIDEPAN: "+ this.editForm.controls['category'].value);
        this.categoryList.forEach(catList => {
          console.log("I VALUE : "+j + " CATEGORY LIST ke I adalah : "+this.categoryList[j].name);
          if(this.categoryList[j].name===this.editForm.controls['category'].value){
            console.log("HMM IDEM ");
            this.editForm.patchValue({'category' : this.categoryList[j].name});
          }
          j++;
        });

      }, error => { //ini macam catch nya
        console.log(error);
      }
    );
  }

}
