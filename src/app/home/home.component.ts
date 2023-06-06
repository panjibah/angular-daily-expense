import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { AppModel } from '../app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private postService: PostService, private route:ActivatedRoute) { }
  loadedPostIncome = [];
  loadedPostExpense = [];
  totalExpense = 0;
  totalIncome = 0;
  isReportLoading = true;
  ngOnInit(): void {
    this.fetchPost();
  }

  logout(){
    this.router.navigate(
      []
    )
  }

  goEdit(id:string){
    this.router.navigate(['edit',id]);
  }

  fetchPost(){
    this.postService.fetchHistory().subscribe(
      posts => {
        this.totalExpense = 0;
        this.totalIncome = 0;
        this.loadedPostIncome = [];
        this.loadedPostExpense = [];
        this.isReportLoading = true;
        posts.forEach(item => {
          if(item.type==='expense' && !item.isDeleted){ this.loadedPostExpense.push({
            'date' : item.date, 
            'category' :item.category, 
            'amount' :item.amount, 
            'description': item.description,
            'type': item.type,
            'id' : item.id
          });
          this.totalExpense += +item.amount;
        }else if(item.type==='income' && !item.isDeleted){
            this.loadedPostIncome.push({
              'date' : item.date, 
              'category' :item.category, 
              'amount' :item.amount, 
              'description': item.description,
              'type': item.type,
              'id' : item.id
            });
            this.totalIncome += +item.amount;
          }
          this.isReportLoading = false;
        });
        console.log(posts);
      }, error => { //ini macam catch nya
        console.log(error);
      }
    );
  }
  get sortIncomeData() {
    return this.loadedPostIncome.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

  get sortExpenseData() {
    return this.loadedPostExpense.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

  deleteData(model:AppModel){
    console.log(model);
    this.postService.deleteSinglePosts(model).subscribe(
      (data)=> {
        console.log(data);
        this.fetchPost();
      }
    );
  }

  updateData(model:AppModel){
    console.log("UWAAAAAAAAAAAAAAAAAAAAAAA"+model.id);
    this.router.navigate(['editTable', model.id]); //KENAPA INI GA KE SEND SI PARAMETERNYA DI EDIT TABLE
    // this.postService.deleteSinglePosts(model).subscribe(
    //   (data)=> {
    //     console.log(data);
    //     this.fetchPost();
    //   }
    // );
  }
}
