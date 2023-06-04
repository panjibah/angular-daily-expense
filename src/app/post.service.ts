import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { map, tap } from 'rxjs/operators';
import { AppModel } from './app.model';
import { CompModel } from './component.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endPointURL:string = 'https://angular-daily-expense-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endPointURL + 'ListOfData.json';
  categoryURL: string = this.endPointURL + 'category.json';
  errorHandling =  new Subject<any> ();

  constructor(private http: HttpClient) {}

  onCreateData(postData: AppModel){
    //this.postURL += this.endPointURL + 'ListOfData/Income.json';
    console.log("ABCDEFG");
    console.log(postData);
    const myId = uuidv4();
    const updateFormatted = {
      [myId]:{
        'date' : postData.date, 'category' :postData.category, 'amount' :postData.amount, 'description' :postData.description, 'isDeleted': false, 'type': postData.type
      }
    }
    
    return this.http.patch(this.postURL, updateFormatted);
    
  }

  deletePosts(){   
    return this.http.delete(this.postURL,{
      observe: 'events'
    })
  }

  deleteSinglePosts(postData: AppModel){
    const updateFormatted = {
      [postData.id]:{
        'date' : postData.date, 
        'category' :postData.category, 
        'amount' :postData.amount, 
        'description': postData.description,
        'isDeleted': true,
        'type': postData.type
      }
    }
    return this.http.patch(this.postURL, updateFormatted);
  }
  
  fetchHistory(){

    return this.http.get<{[key: string]: AppModel}>(this.postURL)
    .pipe(
      map(responseData =>{
        const postArray: AppModel[] = [];
        //console.log("responseData ADALAH "+ responseData);
        for(const key in responseData){
         // console.log("responseData KEY ADALAH "+ key);
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key],id: key})
          }
        }
        return postArray;
      })
    )
  }

  fetchSingleValue(idSearched: string){

    return this.http.get<{[key: string]: AppModel}>(this.postURL)
    .pipe(
      map(responseData =>{
        const postArray: AppModel[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key) && key === idSearched){
            postArray.push({...responseData[key],id: key})
          }
        }
        return postArray;
      })
    )
  }

  fetchComponentList(){

    return this.http.get<{[key: string]: CompModel}>(this.categoryURL)
    .pipe(
      map(responseData =>{
        const postArray: CompModel[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key],id: key})
          }
        }
        return postArray;
      })
    )
  }

}
