import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './cvTech/cv/cv.component';
import { LoginComponent } from './login/login.component';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { DetailComponent } from './cvTech/detail/detail.component';
import { DeleteCvComponent } from './cvTech/delete-cv/delete-cv.component';
import { ErrorComponent } from './error/error.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ArticlesComponent } from './articles/articles.component';
import { LogoutComponent } from './logout/logout.component';
import {RegisterComponent} from "./register/register.component";
import {AccessGuard} from "./guards/access.guard";
import {ArticleDetailComponent} from "./articles/article-detail/article-detail.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PalestineMapComponent} from "./palestine-map/palestine-map.component";
import {QuizzTineComponent} from "./quizz-tine/quizz-tine.component";
import {ContactComponent} from "./contact/contact.component";
const routes: Routes = [
  {path: 'cv', children:[
    { path: '', component: CvComponent },
    { path: 'delete/:id', component: DeleteCvComponent },
    { path: ':id', component: DetailComponent },
  ]},
  { path: '', component: HomeComponent },

  { path: 'Login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },

  { path: "word", component: MiniWordComponent ,canActivate :[AccessGuard]},
  { path: 'about', component: AboutUsComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article/:id', component: ArticleDetailComponent},
  { path: 'dashboard', component: DashboardComponent , canActivate : [AccessGuard]},
  { path: 'palestine-map', component: PalestineMapComponent},
  { path: 'quizz-tine', component: QuizzTineComponent },
  { path: 'contact', component: ContactComponent },




  //en cas d'erreur
    { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
