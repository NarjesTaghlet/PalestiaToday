import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RainbowDirective } from './directives/rainbow.directive';
import { MiniWordComponent } from './mini-word/mini-word.component';
import { CustomDirective } from './directives/custom-directive.directive';
import {CvComponent} from "./cvTech/cv/cv.component";
import {ListeCvComponent} from "./cvTech/liste-cv/liste-cv.component";
import {ItemCvComponent} from "./cvTech/item-cv/item-cv.component";
import {DetailCvComponent} from "./cvTech/detail-cv/detail-cv.component";
import { EmbaucheComponent } from './cvTech/embauche/embauche.component';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DetailComponent } from './cvTech/detail/detail.component';
import { DeleteCvComponent } from './cvTech/delete-cv/delete-cv.component';
import { HttpComponent } from './http/http.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ArticlesComponent } from './articles/articles.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import {AccessGuard} from "./guards/access.guard";
import { ArticleDetailComponent } from "./articles/article-detail/article-detail.component";
import {ErrorComponent} from "./error/error.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NgxPaginationModule} from "ngx-pagination";
import {QuizzTineComponent} from "./quizz-tine/quizz-tine.component";
import {PalestineMapComponent} from "./palestine-map/palestine-map.component";
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    DefaultImagePipe,
    RainbowDirective,
    MiniWordComponent,
    CustomDirective,
    DetailComponent,
    DeleteCvComponent,
    HttpComponent,
    AboutUsComponent,
    HighlightDirective,
    ArticlesComponent,
    LogoutComponent,
    RegisterComponent,
    ArticleDetailComponent,
    ErrorComponent,
    DashboardComponent,
    QuizzTineComponent,
    PalestineMapComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ListeCvComponent,
    DetailCvComponent,
    ItemCvComponent,
    HttpClientModule,
    EmbaucheComponent,
    CvComponent,
    NgIf,
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
    }),
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule


  ],
  providers: [
    AuthService,
    AuthGuard,
    AccessGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
