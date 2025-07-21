import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  value?: number;

  @Column({ type: "date" })
  saleDate?: Date;

  @ManyToOne("Client", "sales", { onDelete: "CASCADE" })
  @JoinColumn({ name: "clientId" })
  client?: any;

  @Column()
  clientId?: number;
}
