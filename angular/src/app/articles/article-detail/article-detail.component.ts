import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from "../../services/article.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {forkJoin, Subscription} from "rxjs";
import {Reaction} from "../../Model/reaction";
import {Article} from "../../Model/article";

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
    article: any;
    newComment: string = '';
    comments: string[] = []; // Array to store comments
    userRating: number = 5;
    selectedRating: number = 0;
    commentsToShow :number =3 ;
    isModifying = false; // Boolean variable to track whether modification mode is active
    //like section
    hasLiked: boolean = false;
    hasDisliked: boolean = false;


    articleIdParam = this.route.snapshot.paramMap.get('id');
     user = this.authservice.getUser(this.authservice.getToken());


    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        public authservice : AuthService,
        private toastr : ToastrService,

    ) {}

  ngOnInit(): void {
    this.article = { likes: 0, dislikes: 0 };
    const articleIdParam = this.articleIdParam;
    this.getComments();

    if (articleIdParam) {
      const articleId = +articleIdParam;
      const user = this.authservice.getUser(this.authservice.getToken())
      //console.log(this.authService.getToken());

      this.articleService.getLikes(articleId).subscribe(
        (response) =>{
          this.article.likes = response ;
        }
      )

      this.articleService.getDislikes(articleId).subscribe(
        (response) =>{
          this.article.dislikes=response;
        }
      )
      ////////////////NOTE//////////////////
      if(user && articleIdParam){
        this.checkUserReaction(articleId, user.id);
        const idUser = user.id ;
        this.articleService.getNote(+articleIdParam,+idUser).subscribe(
          (note) => {
            this.userRating = note.length ? note[0].note : 0;
            this.selectedRating = this.userRating;
          },
          (error) => {
            console.error('Error fetching user note:', error);
            this.userRating = 0;
            this.selectedRating = 0;
          }
        );
        ////////////////COMMENTS//////////////////

        this.articleService.getComments(articleId);
        this.articleService.fetchArticleData(articleId).subscribe(
          (data: Article[]) => {
            this.article = data;
          },
          (error) => {
            console.error('Error fetching article data:', error);
          }
        );
      } else {
        // Handle the null case
        this.router.navigate(['/error']);
      }
      if (this.article.likes === undefined) {
        this.article.likes = 0;
      }
      if (this.article.dislikes === undefined) {
        this.article.dislikes = 0;
      }
    }
  }
/**************************** Like/Dislike Section *************************/

  toggleLike1() {

    const articleIdParam = this.articleIdParam;
    const user = this.user;
    if (user && articleIdParam) {
      const idUser = user.id;
      this.articleService.addLike(+articleIdParam, +idUser).subscribe(
        () => {
          // Get the updated number of likes
          this.articleService.getLikes(+articleIdParam).subscribe(
            (likesCount) => {
              console.log('Likes count after like added:', likesCount);
              // Update like and dislike counters
              this.updateLikeState(likesCount);
            },
            (error) => {
              console.error('Error getting likes after adding like:', error);
            }
          );
        },
        (error) => {
          console.error('Error adding like:', error);
        }
      );
    }
  }

  // toggleDislike function
  toggleDislike() {
    const articleIdParam = this.articleIdParam;
    const user = this.user;

    if (user && articleIdParam) {
      const idUser = user.id;
      this.articleService.adddisLike(+articleIdParam, +idUser).subscribe(
        () => {
          this.articleService.getDislikes(+articleIdParam).subscribe(
            (dislikesCount) => {
              console.log('Dislikes count after dislike added:', dislikesCount);
              this.updateDislikeState(dislikesCount);
            },
            (error) => {
              console.error('Error getting dislikes after adding dislike:', error);
            }
          );
        },
        (error) => {
          console.error('Error adding dislike:', error);
        }
      );
    }
  }

  updateLikeState(likesCount: number) {
    // Update the state based on the new likesCount
    if (this.article.liked) {
      // If already liked, the new like is actually a dislike
      this.article.likes--;
    } else {
      // If not liked, update the like count
      this.article.likes = likesCount;

      // If already disliked, decrement the dislike count
      if (this.article.disliked) {
        this.article.dislikes--;
      }
    }
    // Toggle the liked/disliked status
    this.article.liked = !this.article.liked;
    this.article.disliked = this.article.liked ? false : this.article.disliked;
  }


  updateDislikeState(dislikesCount: number) {
    if (this.article.disliked) {
      this.article.dislikes--;
    } else {
      this.article.dislikes = dislikesCount;
      if (this.article.liked) {
        this.article.likes--;
      }
    }
    this.article.disliked = !this.article.disliked;
    this.article.liked = this.article.disliked ? false : this.article.liked;
  }

  checkUserReaction(articleId: number, userId: number) {
    this.articleService.getReaction(articleId, userId).subscribe(
      (reactions: Reaction[]) => {
        if (!reactions.length) {
          this.hasLiked = false;
          this.hasDisliked = false;
          return;
        }
        // Get the last reaction which represents the current state
        const latestReaction = reactions[reactions.length - 1];
        if (latestReaction.reaction === 'like') {
          this.toggleLike1();
        } else if (latestReaction.reaction === 'dislike') {
          this.toggleDislike();
        }
      },
      (error) => {
        console.error('Error fetching reaction:', error);
      }
    );
  }
  /************************ Comment Section *************************/
  addComment(): void {
      const articleIdParam = this.articleIdParam;
      const user = this.user ;
      console.log("ena user " , user)
      if(user && articleIdParam){
       const idUser = user.id ;
        this.articleService.addcomment(this.newComment,+articleIdParam,+idUser).subscribe(
          (response) =>{
            this.toastr.success("commentaire ajouté avec succès");
            this.getComments()
          },
          (error)=>{
            this.toastr.error("Erreur lors de l'ajout");
          }
        );
      }
      this.newComment = '';
      //this.getComments()
  }
  getComments() {
    const articleIdParam = this.route.snapshot.paramMap.get('id');

    if (articleIdParam) {
      this.comments =[];
      this.articleService.getComments(+articleIdParam).subscribe(
        (data) => {
          //  processing comments sequentially
          this.processCommentsOnebyOne(data, 0);
        },
        (error) => {
          this.toastr.error("Erreur getting comments");
        }
      );
    }
  }

  processCommentsOnebyOne(data: any[], index: number) {
    if (index < data.length) {
      const comment = data[index];
      const username = comment.username
      const commentText = ` ${username} :  ${comment.commentaire}`;
      this.comments.unshift(commentText);
      // Process the next comment
      this.processCommentsOnebyOne(data, index + 1);
    }
  }

  loadMoreComments() {
    this.commentsToShow  +=3;
  }
  showLessComments() {
    this.commentsToShow = 3;
  }


  /**************** Rating SECTION **********************/

  setRating(rating: number): void {
    const articleIdParam = this.articleIdParam;
    const user = this.user;
    if (user && articleIdParam) {
      const idUser = user.id;
      if (this.selectedRating === rating) {
        // If the user clicks the same star again, reset the rating
        this.selectedRating = 0;
      } else {
        // Update the selected rating
        this.selectedRating = rating;
      }
      // Call the API to add/update the rating
      this.articleService.addNote(+articleIdParam, idUser, this.selectedRating).subscribe(
        (response) => {
          this.userRating = this.selectedRating;
        },
        (error) => {
          console.error('Error updating user note:', error);
          this.selectedRating = this.userRating;
        }
      );
    }
  }
  /*************** Article Section *********************/

  modifyArticle(): void {
    this.isModifying = true;
  }

  saveModification(): void {
    const articleIdParam = this.articleIdParam;
    if(articleIdParam){
    this.articleService.ModifyArticle(+articleIdParam,this.article.title,this.article.description).subscribe(
      (response)=>{
        this.toastr.success("modified successfully")
      },
      (error)=>{
        console.log("erreur")
      }
    )
  }
    this.isModifying = false;
  }
  cancelModification(): void {
    this.isModifying = false;
  }
  deleteArticle() {
    const articleIdParam = this.route.snapshot.paramMap.get('id');
    if (articleIdParam) {
      this.articleService.DeleteArticle(+articleIdParam).subscribe(
        (response) => {
          console.log(response)
          this.toastr.success("Deleted successfully")
          this.router.navigate(['/articles']);

        },
        (error) => {
          this.toastr.error("Error deleting")
        }
      )

    }
  }
    protected readonly AuthService = AuthService;
}
