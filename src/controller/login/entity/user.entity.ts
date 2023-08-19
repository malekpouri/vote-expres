import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "../../../model/entity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ length: 50 })
  username!: string;

  @Column({ length: 50 })
  password!: string;

  @Column({ length: 50 })
  role!: UserRole;
}
