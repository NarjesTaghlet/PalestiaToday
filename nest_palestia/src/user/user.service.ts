import {ConflictException, Injectable, NotFoundException, Request, UnauthorizedException} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import {ExceptionHandler} from "@nestjs/core/errors/exception-handler";
import {Role_userEnum} from "../enums/role_user.enum";
import {AddArticleDto} from "../article/dto/add-article.dto";
import {Article} from "../article/entities/article.entity";
import {JwtService} from "@nestjs/jwt";
import {ArticleService} from "../article/article.service";

@Injectable()
export class UserService {
constructor(
   @InjectRepository(User)
   private UserRepository : Repository<User>,
   private jwtService : JwtService,
)
{
}
  async Signup(datauser : RegisterUserDto) : Promise<User>
  {
    //const {username,password,email} =datauser
    //const user = new User()
    const user = this.UserRepository.create({
      ...datauser
    })

    //il faut creer un salt (password salting a technique to protect passwords stored in databases by adding a string of 32 or more characters and then hashing them)

    user.salt = await bcrypt.genSalt(); // genSalt est asynchrone
    user.password=await bcrypt.hash(user.password,user.salt);
    //sauvegarder notre user


    user.role=Role_userEnum.ABONNEE;
    try{
      await this.UserRepository.save(user);
    }catch(e){
      throw new ConflictException(`Nom d'utilisateur ou email ne sont pas uniques !!`);
    }
  return  user ;

  }

  async login(credentials :LoginCredentialsDto) {

//recuperer le login credentials (username et passwor)
    const {username,password} = credentials ;

    console.log(credentials);
    //verifier si c est le useer correspopndant
     const utilisateur = await this.UserRepository.createQueryBuilder("User")
         .where("User.username = :username or User.email = :username",{username}).getOne()
    //console.log("hi")
    //console.log(utilisateur)
    if (!utilisateur){
      //si nn declencher erreur
      throw new  NotFoundException("username ou email erroné ! , veuillez vérifier svp");
    }
    //si oui =$c bon
    //si oui , verifie que mdp correct ou nn
    const hashedPassword =await bcrypt.hash(password,utilisateur.salt);
    if(hashedPassword === utilisateur.password)
    {
      const payload={
        id : utilisateur.id,
        username,
        email : utilisateur.email,
        role : utilisateur.role
      }
      const jwt =await this.jwtService.sign(payload,{expiresIn:3600});
    // on retourne le token au lieu du données
    return {
      "access_token" : jwt
    }
    }else{
      throw new NotFoundException("verifier votre username ou votre password !")
    }
  }

  /*async ajouter_article(article : AddArticleDto, user : User) : Promise<Article>{

  if (user.role== Role_userEnum.ADMIN){
    return await this.ArticleService.create(article)
    console.log("réussie")

  }else {
    throw new UnauthorizedException("vous n'avez pas le droit")
  }
  }
*/

  async getUserById(id: number): Promise<User[]> {
    console.log(await this.UserRepository.find({ where: { id } }))
    return await this.UserRepository.find({ where: { id } });

  }

  async restoreuser(id : number){
    return await this.UserRepository.restore(id);
  }


  create(createUserDto: RegisterUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.UserRepository.find();
  }

  async findOne(id: number) {
    return await this.UserRepository.findOneBy({ id: id });
  }

  update(id: number, updateUserDto: LoginCredentialsDto) {
    return `This action updates a #${id} user`;
  }


  isAdmin(user) {
    return user.role === Role_userEnum.ADMIN ;
  }


  async softDelete(id : number){
    return await this.UserRepository.softDelete(id);
  }
}
