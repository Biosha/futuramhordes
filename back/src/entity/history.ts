import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Relation,
	ManyToOne
} from 'typeorm';
import { Player } from './index.js';

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Player, player => player.history, {
		onDelete: 'CASCADE'
	})
	player: Relation<Player>;

	@Column({
		nullable: false
	})
	points: number;

	@CreateDateColumn()
	createdDate: Date;

	constructor(test: number, player: any) {
		this.points = test;
		this.player = player;
	}
}
