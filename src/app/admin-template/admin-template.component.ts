import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {
constructor(public authService : AuthenticationService, public route:Router){}

ngOnInit(){

}

handleLogout(){
  let conf=confirm("are u sure?");
  if (conf==false) return;
  this.authService.logout().subscribe({
    next : (data)=>{
      this.route.navigateByUrl("/login");
    }
  });
}
}
