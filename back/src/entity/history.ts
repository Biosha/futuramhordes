import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Relation,
	ManyToOne
} from 'typeorm';
import { Player } from './player.js';

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false
	})
	name: string;

	@ManyToOne(() => Player, player => player.history, {
		onDelete: 'CASCADE'
	})
	player: Relation<Player[]>;

	@Column({
		nullable: false
	})
	points: number;

	@Column({
		nullable: false
	})
	result: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;
}
