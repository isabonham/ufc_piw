import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Order } from "./Order"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
    
    @Column()
    username!: string
    
    @Column()
    email!: string
    
    @Column()
    password!: string
    
    @ManyToOne(() => Role, role => role.users)
    role!: Role

    @OneToMany(() => Order, order => order.user)
    orders!: Order[] 
}