import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from "../entities/user.entity";
import {PayloadInteerface} from "../payload.inteerface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET_KEY'),
        });
    }

    async validate(payload: PayloadInteerface) {
        //comment valider le token a chaque fois q'une requete vient
        // j'ai récupéré mon user
        console.log(payload);
       // const user = await this.userRepository.findOne({
         //   username : payload.username});
        const user = await this.userRepository.findOne({
            where: { username: (payload as { username: string }).username },
        });

        // Si le user existe je le retourne et la automatiquement ce que je retourne dans validate
        // est mis dans la request
        if (user) {
            delete user.salt;
            delete user.password;
            return user;
        } else {
            // Si non je déclenche une erreur
            throw new UnauthorizedException();
        }

    }
}