import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { AddArticleDto } from './dto/add-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "./entities/article.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {Interactionarticle} from "../interactionarticle/entities/interactionarticle.entity";
import {InteractionarticleService} from "../interactionarticle/interactionarticle.service";


@Injectable()
export class ArticleService {

  constructor(
      @InjectRepository(Article)
      private readonly ArticleRepository : Repository<Article>,
     @InjectRepository(Interactionarticle)
      private  readonly InteractionRepository : Repository<Interactionarticle>
      //private userService : UserService
  ) {}

  //Création d'article == ajout article

  async create(createArticleDto: AddArticleDto) : Promise<Article>{
    const article = this.ArticleRepository.create(createArticleDto);
    return await this.ArticleRepository.save(article);
  }


  async getArticles(): Promise<Article[]> {
    return await this.ArticleRepository.find()
  }

  findAll() {
    return `This action returns all article`;
  }



  async findOneArticle(id: number): Promise<Article | null> {
    return await this.ArticleRepository.findOneBy({ id });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.ArticleRepository.update(id,updateArticleDto);
  }

  async findOne(id: number) {
    return await this.ArticleRepository.findOneBy({ id: id });
  }

  async updateArticle(id: number, article: UpdateArticleDto): Promise<Article> {
    //On récupére le article d'id id et ensuite on remplace les anciennes valeurs de cet article
    // par ceux passé en paramètre
    const newArticle = await this.ArticleRepository.preload({
      id,
      ...article
    });
    // tester le cas ou le article d'id id n'existe pas
    if(!newArticle) {
      throw new NotFoundException(`Article d'id ${id} n'existe pas`);
    }
    //sauvgarder la nouvelle entité donc le nouveau cv
    else{

      return await this.ArticleRepository.save(newArticle);

    }

  }
  async remove(id: number) {
    return await this.ArticleRepository.softDelete(id);

  }

  async restore(id:number) {
    return await this.ArticleRepository.restore(id);
  }
  async findArticleById(id: number) {
    const article = await this.findOneArticle(id);
    if (!article) {
      throw new NotFoundException(`L'article d'id ${id} n'existe pas`);
    }
    return article;
  }


  async getDeletedArticles(): Promise<Article[]> {
    return this.ArticleRepository
        .createQueryBuilder('article')
        .withDeleted()
        .where('article.deletedAt IS NOT NULL')
        .getMany();

  }


  async restoreArticle(articleId: number): Promise<void> {
    const article = await this.ArticleRepository.findOne({ where: { id: articleId }, withDeleted: true });

    if (article) {
      await this.ArticleRepository.restore(articleId);

      // Restore the associated Interactionarticle entities
      const interactions = await this.InteractionRepository.find({ where: { id: articleId }, withDeleted: true });
      await Promise.all(interactions.map(async (interaction) => {
       // await this.InteractionRepository.restore(interaction);
        await this.InteractionRepository.restore(interaction)
      }));
    }

  }


}
