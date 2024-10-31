import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string | null = null; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }
}
