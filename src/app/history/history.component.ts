import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router:Router,private postService:PostService) { }
  loadedPosts = [];
  ngOnInit() {
    this.postService.fetchHistory().subscribe(
      posts => {
        this.loadedPosts = posts;
        //console.log(posts);
      }, error => { //ini macam catch nya
        console.log(error);
      }
    );
  }
  addNewIncome(){
    this.router.navigate(['income']);
  }
  addNewExpense(){
    this.router.navigate(['expenses']);
  }
  clearHistory() {
    // Send Http request
    this.postService.deletePosts().subscribe(
      (data)=>{
        this.fetchHistory();
      }
    );
    
  }

  fetchHistory(){
    this.postService.fetchHistory()
    .subscribe(
      posts => {
        this.loadedPosts = posts;
        //console.log(posts);
      }, error => { //ini macam catch nya
        console.log(error);
      }
    );
  }

  get sortData() {
    return this.loadedPosts.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

}
