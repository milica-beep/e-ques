import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let token = params.get('token');

      let data = {
        'token': token
      };

      this.authService.verifyEmail(data).subscribe(
        response => {
          console.log(response)
          this.snackBar.open(response['message'], 'OK', {
            duration: 3000,
          });
        },
        error => {
          console.log(error);
        }
      )
    })
  }

}
