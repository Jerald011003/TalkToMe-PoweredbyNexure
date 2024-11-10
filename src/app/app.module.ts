import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp} from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppNavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { FirebaseService } from './firebase.service';  // Import FirebaseService
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
// const firebaseConfig = {
//   apiKey: "AIzaSyARXZOiWbpouDLZQX5Jg8gXkGcDIOy8TVc",
//   authDomain: "talk-to-me-63d17.firebaseapp.com",
//   projectId: "talk-to-me-63d17",
//   storageBucket: "talk-to-me-63d17.firebasestorage.app",
//   messagingSenderId: "263087346884",
//   appId: "1:263087346884:web:8dafa07008811750862591",
//   measurementId: "G-FP2ZF8LGNY"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


@NgModule({
  declarations: [
    // AppComponent,
    LoginComponent,
    RegisterComponent,
    // AppNavbarComponent,
    // FooterComponent,
    // HomeComponent,
    // SkeletonComponent


  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FirebaseService],  // Add FirebaseService to providers
  bootstrap: [AppComponent]
})
export class AppModule { }
