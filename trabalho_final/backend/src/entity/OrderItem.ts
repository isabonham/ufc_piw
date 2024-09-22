import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { CD } from "./CD";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Order, order => order.items)
    order!: Order;

    @ManyToOne(() => CD)
    cd!: CD;

    @Column('int')
    quantity!: number;

    @Column('decimal')
    price!: number;  
}
