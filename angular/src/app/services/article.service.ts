import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {ReactionType} from "../Model/interactionarticle";
import {Article} from "../Model/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {




  private apiUrl = 'http://localhost:3000/article';
  private  apiUrl2='http://localhost:3000/interactionarticle' ;

  constructor(private http: HttpClient,private authservice : AuthService) { }

  postArticle(title: string, description: string): Observable<any> {
   const params = new HttpParams().set('access_token',this.authservice.getToken());
    return this.http.post<any>(`${this.apiUrl}/add` , { title, description },{params});
  }

  getArticles(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }

  fetchArticleData(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${articleId}`);
  }

  getComments(articleId : number):Observable<any> {
      return this.http.get<any>(`${this.apiUrl2}/comment/${articleId}`);
  }
  addcomment(contenu : string , articleId : number , idUser: number):Observable<any>{
      return this.http.post<any>(`${this.apiUrl2}/comment/${articleId}/${idUser}`,{contenu});

  }

  DeleteArticle(articleId : number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${articleId}`);
  }

  ModifyArticle(articleId : number,title : string , description : string){
    return this.http.patch<any>(`${this.apiUrl}/${articleId}`,{title, description});
  }
  addLike(idArticle: number, idVisiteur: number): Observable<any> {
        return this.http.post(`${this.apiUrl2}/like/${idArticle}/${idVisiteur}`, { reaction: ReactionType.LIKE });
    }
    adddisLike(idArticle: number, idVisiteur: number): Observable<any> {
        return this.http.post(`${this.apiUrl2}/like/${idArticle}/${idVisiteur}`, { reaction: ReactionType.DISLIKE });
    }


    addNote(idArticle: number, idVisiteur: number, note: number): Observable<any> {
        return this.http.post(`${this.apiUrl2}/note/${idArticle}/${idVisiteur}`, { note });
    }

    getNote(idArticle: number, idVisiteur: number): Observable<any> {
        return this.http.get(`${this.apiUrl2}/note/${idArticle}/${idVisiteur}`);
    }



    getLikes(articleId: number): Observable<number> {
        return this.http.get<number>(`${this.apiUrl2}/likes/${articleId}`);
    }
    getDislikes(articleId: number): Observable<number> {
        return this.http.get<number>(`${this.apiUrl2}/dislikes/${articleId}`);
    }



  getNoteGenerale(idArticle: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/general/${idArticle}`);
  }


  getDeletedArticles(): Observable<any> {
    const url = `${this.apiUrl}/deleted`;
    return this.http.get<any>(url);
  }

  RestoreArticle(idArticle : number) {
    return this.http.get(`${this.apiUrl}/restore/${idArticle}`);
  }

  getReaction(idArticle: number, idVisiteur: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/reaction/${idArticle}/${idVisiteur}`);
  }



  getSummary(content: string): string {
    const firstSentence = content.split(/(?<=[.?!])\s/, 1)[0];
    return firstSentence;
  }

  readonly staticImages: string[] = [
    './../../assets/images/bg1.jpg',
    './../../assets/images/bg3.jpg',
    './../../assets/images/bg4.jpg',
    './../../assets/images/header.jpg',
    './../../assets/images/bg2.jpg',
    // ... other images
  ];

  getImageForArticle(index: number): string {
    return this.staticImages[index % this.staticImages.length];
  }



}
