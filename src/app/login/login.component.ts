import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, AuthResponseData, AuthRequestData} from '../auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild('ngFormRef') form?: NgForm;
  isLoginMode = true;
  error: string = null;

constructor( private authService: AuthService, private router: Router) { }
    errorMessage= '';
  ngOnInit(): void {
  }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
        //console.log(this.isLoginMode);
    }
  onSubmit(elementRef: NgForm){



  const authRequestData: AuthRequestData = {
      email : elementRef.value.email,
      password : elementRef.value.password,
      returnSecureToken : true
    };


      let authObservable: Observable<AuthResponseData>;
      if(this.isLoginMode){
          authObservable = this.authService.login(authRequestData);
      } else {
          authObservable = this.authService.signUp(authRequestData);
      }
  authObservable.subscribe(
          resdata => {
              //console.log(resdata);
             // this.isLoading = false;
              this.router.navigate(['/income']);
             //  this.router.navigate(['/income'])

          },
          errorMsg => {
              // console.log(errorMsg);
              this.errorMessage = errorMsg;
             // this.isLoading = false;
          }
      );

  elementRef.reset();
  }


}
