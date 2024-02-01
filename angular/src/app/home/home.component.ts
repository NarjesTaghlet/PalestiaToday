import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import {ArticleService} from "../services/article.service";

interface Article {
  title: string;
  summary: string;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showBackToTopButton = true;
  articles:any[] = [];


ngOnInit() {
  this.loadArticles();
}

  constructor(private router: Router, private toastr: ToastrService,private articleService : ArticleService) {}

  activeSlideIndex = 0;

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      (data: any) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error loading articles', error);
        this.toastr.error("Error loading articles")
      }
    );
  }

  openArticle(articleId: number): void {
    this.toastr.info('Redirecting to article...');
    this.router.navigate(['/article', articleId]);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showBackToTopButton = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 20;
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getImageForArticle(index: number): string {
    return  this.articleService.getImageForArticle(index);
  }
  getSummary(content: string) {
   return this.articleService.getSummary(content)
  }

  openContactUs(): void {
    this.toastr.success('Redirecting to Contact ...');
    this.router.navigate(['/contact']);
  }
}
