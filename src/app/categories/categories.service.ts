import {Injectable} from '@angular/core';
import {Category} from './category.model';
import {Observable, of, Subject} from 'rxjs';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    errorHandling = new Subject<any>();
    endPointURL = 'https://angular-daily-expense-default-rtdb.asia-southeast1.firebasedatabase.app/';
    postURL: string = this.endPointURL + 'category.json';

    private loadedCategories: Category[] = [
        {

            name: 'incomeCat',
            type: 'income'
        },
        {

            name: 'expenseCat',
            type: 'expense'
        },
    ];

    constructor(private http: HttpClient, private authService: AuthService) {

    }


    getCategories(): Observable<Category[]> {
        const categories = of(this.loadedCategories).pipe(map(cat => cat.filter(cats => cats.type === 'expense')), tap(_ => console.log('fetched heroes')));
        return categories;
    }

    addCategories(category: { name?: string, type?: string }) {

        const newCat: Category = {name: '', type: ''};
        newCat.name = category.name;
        newCat.type = category.type;
        this.loadedCategories.push(newCat);
        //console.log(this.loadedCategories.filter(cat => cat.type === 'expense'));
        //console.log(this.loadedCategories);

    }

    onCreatePost(category: { name?: string, type?: string }) {
        return this.http.post(this.postURL, category);
    }

    fetchCategories() {
        return this.http.get<{ [key: string]: Category }>(this.postURL, {
            headers: new HttpHeaders({
                'custom-header': 'header category'
            }),
            responseType: 'json'
        }).pipe(
            map(responseData => {
                const postArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({...responseData[key], id: key});
                    }
                }
                return postArray;
            })
        );
    }

    fetchCategoriesByType(type: string) {
        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<{ [key: string]: Category }>(this.postURL, {
                    params: new HttpParams().set('auth', user.token)
                });

            }),
            map(responseData => {
                const postArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({...responseData[key], id: key});
                    }
                }
                return postArray.filter(data => data.type === type);
            })
        );

    }

    private log(fetchedHeroes: string) {

    }
}
