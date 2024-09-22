import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CD {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    artist!: string;

    @Column('decimal')
    price!: number;

    @Column('int')
    stock!: number; 
}
