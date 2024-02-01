import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import {AuthService} from "../services/auth.service";
import {Article} from "../Model/article";
//import { fadeIn, cardAnimation } from './../animations'; // Update with your actual path

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  // animations: [fadeIn, cardAnimation]

})
export class ArticlesComponent implements OnInit {
  articles:any[] = [];
  filteredArticles:any[] = [...this.articles];
  p: number = 1; // Current page(module pagination )
  keywordFilter: string = '';
  showCard = false;
  totallength! : any ;
  pages2: number[] = [];
  currentPage2: number = 1;
  pageSize2: number = 6;

  constructor(private router: Router, public articleService: ArticleService,public authservice : AuthService) {

  }

  ngOnInit(): void {
    this.loadArticles();
  }
loadArticles(): void {
  this.articleService.getArticles().subscribe((articles: Article[]) => {
    this.articles = articles;
    this.filteredArticles = articles;
    this.calculatePages2();
  });
}


// Method to toggle card visibility
viewArticleDetail(articleId: number): void {

  if(this.authservice.isAuthenticated() ){
  this.router.navigate(['/article', articleId]);

}else{
  this.showCard = !this.showCard;
}
}

getSummary(content: string) {
  return this.articleService.getSummary(content);
}


  getImageForArticle(index: number){
   return this.articleService.getImageForArticle(index);
  }


redirectToLogin(){
  this.router.navigate(['/Login']);

}
/******************* Section keyword filter ****************/

  calculatePages2(): void {
    const totalPages2 = Math.ceil(this.filteredArticles.length / this.pageSize2);
    this.pages2 = Array.from({length: totalPages2}, (_, i) => i + 1);
  }
  searchArticles(searchTerm: string): void {
    this.currentPage2 = 1; // Reset to first page
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.calculatePages2();
  }
}
