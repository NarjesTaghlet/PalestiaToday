import {Injectable, NotFoundException, Req} from '@nestjs/common';
import { CreateInteractionarticleDto } from './dto/create-interactionarticle.dto';
import { UpdateInteractionarticleDto } from './dto/update-interactionarticle.dto';
import { Interactionarticle } from './entities/interactionarticle.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../article/entities/article.entity';
import { User } from '../user/entities/user.entity';
import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';
import { ReactionType } from '../enums/reaction-type';
import { react } from '@babel/types';

@Injectable()
export class InteractionarticleService {
  constructor(
      @InjectRepository(Interactionarticle)
      private readonly InteractionRepository : Repository<Interactionarticle>,
      //private userService : UserService
      private readonly articleService: ArticleService,
      private readonly userService: UserService,
      @InjectRepository(Article)
      private readonly articleRepository: Repository<Article>,

  ) {}
  async findAll() : Promise<Interactionarticle[]> {
    return await this.InteractionRepository.find();
  }

  async update(id: number, updateInteractionarticleDto: UpdateInteractionarticleDto) {
    return await this.InteractionRepository.update(id, updateInteractionarticleDto);
  }

  async remove(id: number) {
    return await this.InteractionRepository.delete(id);
  }

  async findOne(id: number) {
    return await this.InteractionRepository.findOneBy({ id: id });
  }

  async create(createInteractionarticleDto: CreateInteractionarticleDto) : Promise<Interactionarticle>{
    const Interactionarticle = this.InteractionRepository.create(createInteractionarticleDto);
    return await this.InteractionRepository.save(Interactionarticle);
  }

  async ajouterCommentaire(idArticle: number, idVisiteur: number, contenu: string ) {
    const article = await this.articleService.findOne( idArticle );
    const auteurCommentaire = await this.userService.findOne(idVisiteur);

    if (!article) {
      throw new NotFoundException('Article non trouvé');
    }
    if (!auteurCommentaire) {
      throw new NotFoundException('Visiteur non trouvé');
    }


   /* const commentaire = this.InteractionRepository.create({
      commentaire: contenu,
      article: article,
      user: auteurCommentaire
    });

    return this.InteractionRepository.save(commentaire);*/

      const newInteraction = this.InteractionRepository.create({
        article,
        user: auteurCommentaire,
        commentaire : contenu
      });
      await this.InteractionRepository.save(newInteraction);
    }



//-------------------------------------------------------------------------------------------//
  async addNote(idArticle: number, idVisiteur: number, note: number) {
    const article = await this.articleService.findOne(idArticle);
    const utilisateur = await this.userService.findOne(idVisiteur);

    if (!article) {
      throw new NotFoundException('Article non trouvé');
    }
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    let existingInteraction = await this.InteractionRepository.findOne({
      where: {
        article: { id: idArticle },
        user: { id: idVisiteur },
        note: Not(0) // Find an interaction with an existing note
      }
    });

    if (existingInteraction) {
      await this.InteractionRepository.update(existingInteraction.id, { note : note });
    } else {
      const newInteraction = this.InteractionRepository.create({
        article,
        user: utilisateur,
        note
      });
      await this.InteractionRepository.save(newInteraction);
    }
  }


  /*async addLike(idArticle: number, idVisiteur: number, reaction : ReactionType) {
    const article = await this.articleService.findOne(idArticle);
    const utilisateur = await this.userService.findOne(idVisiteur);

    if (!article) {
      throw new NotFoundException('Article non trouvé');
    }
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    let existingInteraction = await this.InteractionRepository.findOne({
      where: {
        article: { id: idArticle },
        user: { id: idVisiteur },
        reaction: Not(IsNull())// Find an interaction with an existing note
      }
    });

    if (existingInteraction) {
      await this.InteractionRepository.update(existingInteraction.id, { reaction : reaction });
    } else {
      const newInteraction = this.InteractionRepository.create({
        article,
        user: utilisateur,
        reaction
      });
      await this.InteractionRepository.save(newInteraction);
    }
  }*/

  async addLike(createDto: CreateInteractionarticleDto) {
    const { commentaire, reaction, note, article_id, user_id } = createDto;

    const article = await this.articleService.findOne(article_id);
    const utilisateur = await this.userService.findOne(user_id);

    if (!article) {
      throw new NotFoundException('Article non trouvé');
    }
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    let existingInteraction = await this.InteractionRepository.findOne({
      where: {
        article: { id: article_id },
        user: { id: user_id },
        reaction: Not(IsNull())// Find an interaction with an existing note
      }
    });

    if (existingInteraction) {
      existingInteraction.reaction = reaction;
      await this.InteractionRepository.save(existingInteraction);
    } else {
      const newInteraction = this.InteractionRepository.create({
        reaction,
        article,
        user: utilisateur
      });
      await this.InteractionRepository.save(newInteraction);
    }
  }

  async getCommentsByArticleId(idArticle: number): Promise<{id: number, commentaire: string}[]> {
    const interactions = await this.InteractionRepository.find({
      where: { article: { id: idArticle }, commentaire: Not(IsNull()) },
      relations: ['article','user']
    });

    if (!interactions) {
      throw new NotFoundException('Comments not found for the article');
    }
    return interactions.map(interaction => ({
      id: interaction.id,
      //id_user : interaction.user.id,
      commentaire: interaction.commentaire,
      username : interaction.user.username
    }));
  }

  async getNotesByArticleId(idArticle: number): Promise<{id: number, note: number}[]> {
    const interactions = await this.InteractionRepository.find({
      where: { article: { id: idArticle }, note: Not(IsNull()) },
      relations: ['article']
    });

    if (!interactions) {
      throw new NotFoundException('Comments not found for the article');
    }

    return interactions.map(interaction => ({
      id: interaction.id,
      note: interaction.note
    }));
  }


  async getNotesByArticleandUser(idArticle: number , idUser: number): Promise<{ note: number}[]> {

    const interactions = await this.InteractionRepository.find({
      where: { article: { id: idArticle }, user: {id: idUser} , note: Not(0) },
      relations: ['article']
    });

    if (!interactions) {
      throw new NotFoundException('Comments not found for the article');
    }

    return interactions.map(interaction => ({
      note: interaction.note
    }));
  }


  async getReactionsByArticleId(idArticle: number): Promise<{id: number, reaction: ReactionType}[]> {
    const interactions = await this.InteractionRepository.find({
      where: { article: { id: idArticle }, reaction: Not(IsNull()) },
      relations: ['article']
    });

    if (!interactions) {
      throw new NotFoundException('Comments not found for the article');
    }

    return interactions.map(interaction => ({
      id: interaction.id,
      reaction: interaction.reaction
    }));
  }

  async getReactionByArticleandUser(idArticle: number , idUser: number): Promise<{ reaction: ReactionType}[]> {

    const interactions = await this.InteractionRepository.find({
      where: { article: { id: idArticle }, user: {id: idUser} , reaction: Not(IsNull()) },
      relations: ['article']
    });

    if (!interactions) {
      throw new NotFoundException('Comments not found for the article');
    }

    return interactions.map(interaction => ({
      reaction: interaction.reaction
    }));
  }



  async calculateGeneralNoteForArticle(idArticle: number): Promise<number> {
    const interactions = await this.InteractionRepository.find({
      where: { article: { id: idArticle }, note: Not(IsNull()) }
    });

    if (interactions.length === 0) {
      return 0; // No notes available for the article
    }

    const totalNote = interactions.reduce((sum, interaction) => sum + interaction.note, 0);
    return totalNote / interactions.length;
  }

  async getTotalLikes(idArticle: number): Promise<number> {
    const interactions = await this.InteractionRepository.find({
      where: {
        article: { id: idArticle },
        reaction: ReactionType.LIKE
      }
    });
    return interactions.length; // Total number of likes
  }

  async getTotalDislikes(idArticle: number): Promise<number> {
    const interactions = await this.InteractionRepository.find({
      where: {
        article: { id: idArticle },
        reaction: ReactionType.DISLIKE
      }
    });
    return interactions.length; // Total number of dislikes
  }

  async getTotalComments(): Promise<number> {
    const interactions = await this.InteractionRepository.find({
      where: {
        commentaire: Not(IsNull())
      }
    });
    return interactions.length; // Total number of comments
  }

  async getLikes(): Promise<number> {
    const interactions = await this.InteractionRepository.find({
      where: {
        reaction: ReactionType.LIKE
      }
    });
    return interactions.length; // Total number of likes
  }



  async getDislikes(): Promise<number> {
    const interactions = await this.InteractionRepository.find({
      where: {
        reaction: ReactionType.DISLIKE
      }
    });
    return interactions.length; // Total number of dislikes
  }



  async addDislike(createDto: CreateInteractionarticleDto): Promise<any> {
    const { article_id, user_id, reaction } = createDto;

    const existingInteraction = await this.InteractionRepository.findOne({
      where: {
        article: { id: article_id },
        user: { id: user_id },
        reaction: Not(IsNull())
      }
    });

    if (existingInteraction) {
      // Update existing interaction if found
      await this.InteractionRepository.update(existingInteraction.id, { reaction });
    } else {
      // Create a new interaction if none exists
      const newInteraction = this.InteractionRepository.create({
        article: { id: article_id },
        user: { id: user_id },
        reaction
      });
      await this.InteractionRepository.save(newInteraction);
    }

    // You can return relevant data or success message
    return { message: 'Dislike added successfully' };
  }


  async restoreinteraction(id:number){
   return await this.InteractionRepository.restore({ article: { id: id } });

  }


}
