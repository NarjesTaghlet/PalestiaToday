import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TimestampEntities} from "../../generics/Timestamp.entities";
import {Interactionarticle} from "../../interactionarticle/entities/interactionarticle.entity";

@Entity('article')
export class Article extends TimestampEntities {
@PrimaryGeneratedColumn()
    id:number
@Column()
    title:string
@Column({length : 10000})
    description:string



  //relation entre article et interactionarticle
    //{ cascade: true } ppour supprimer lkol
    @OneToMany(() => Interactionarticle, (interaction) => interaction.article,{ cascade: ['soft-remove'],onDelete:"CASCADE" })
    interactions: Interactionarticle[];

}
