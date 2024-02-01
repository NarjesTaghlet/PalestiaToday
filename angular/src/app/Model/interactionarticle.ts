export interface Interactionarticle{
  id : number ;
  commentaire : string;
  id_user: number;
  reaction : ReactionType;
}

export enum ReactionType{
    LIKE ='like',
    DISLIKE='dislike'

}
