export interface Article{
    id : number ;
    title : string;
    description : string;
  likes?: number;
  dislikes?: number;

  dislikePercentage?: number;
  likePercentage?: number;
  gnote?: number;
}
