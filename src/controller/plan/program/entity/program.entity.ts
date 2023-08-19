import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { PlanEntity } from "../../entity/plan.entity";
import { UserEntity } from "../../../login/entity/user.entity";

@Entity("program")
export class ProgramEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    planId!: number;
    @Column()
    title!: string;
    @Column()
    description!: string;
    @Column()
    deadline!: Date;
    @Column()
    userId!: string;
    @ManyToOne(()=>UserEntity)
    user!: UserEntity

    @ManyToOne(()=>PlanEntity)
    plan!: PlanEntity;
}