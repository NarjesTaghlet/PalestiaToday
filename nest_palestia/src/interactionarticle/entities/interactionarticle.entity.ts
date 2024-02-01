import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ReactionType} from "../../enums/reaction-type";
import {User} from "../../user/entities/user.entity"
import {Article} from "../../article/entities/article.entity";
import {TimestampEntities} from "../../generics/Timestamp.entities";


@Entity('interactionarticle')
export class Interactionarticle extends TimestampEntities{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    commentaire: string;

    @Column({
        type: 'enum',
        enum: ReactionType,
        nullable: true
    })
    reaction: ReactionType;

    @Column({ default: 0 })
    note: number;
    //Relation avec l'article

    @ManyToOne(() => Article, article => article.interactions, { eager: true })
    @JoinColumn({ name: 'article_id' })
    article: Article;

    //Relation avec user
    @ManyToOne(
        type => User,
        (user) => user.interactions,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    user: User;

}