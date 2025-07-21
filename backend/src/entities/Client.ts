import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sale } from "./Sale";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ type: "date" })
  dataNascimento?: Date;

  @OneToMany(() => Sale, (sale: any) => sale.client)
  sales?: Sale[];
}
