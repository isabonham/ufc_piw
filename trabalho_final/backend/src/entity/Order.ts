import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.orders)
    user!: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    items!: OrderItem[];

    @Column('decimal')
    totalAmount!: number;  
}
