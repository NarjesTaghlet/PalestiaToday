import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {TimestampEntities} from "../../generics/Timestamp.entities";
import {Role_userEnum} from "../../enums/role_user.enum";
import {Interactionarticle} from "../../interactionarticle/entities/interactionarticle.entity";

@Entity('user')
export class User extends  TimestampEntities{
    @PrimaryGeneratedColumn()
    id : number
    @Column(
        {
            unique:true
        }
    )
    username : string
    @Column({
        unique:true
    })
    email : string
    @Column()
    password : string

    @Column()
    salt:string

    @Column(
        {
            type : "enum",
            enum : Role_userEnum,
            //par défaut l 'utilisateur est un visiteur
            //l'abonnée peut faire des interactions (like , comment , .... )
            default :Role_userEnum.VISITEUR,
        }
    )
    role : string

    //un utiisateur peut avoir plusieurs interactions avec un article (un abonneé peut réagir)
    @OneToMany(() => Interactionarticle, (interaction) => interaction.user,{cascade : true})
    interactions: Interactionarticle[];


}



