import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm';

export class TimestampEntities {
    @CreateDateColumn({
        update: false,
    })
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
}