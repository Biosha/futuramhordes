import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Relation
} from 'typeorm';
import { Player } from './player.js';

@Entity()
export class Team {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false
	})
	name: string;

	@Column({
		nullable: false
	})
	points: number;

	constructor(name: string) {
		this.name = name;
		this.points = 0;
	}

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;
}
