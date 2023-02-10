import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Relation,
	ManyToOne
} from 'typeorm';
import { History } from './history.js';
import { Team } from './team.js';

@Entity()
export class Player {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false
	})
	discordId: string;

	@Column({
		nullable: true
	})
	discordTag: string;

	@Column({
		nullable: true
	})
	MHName: string;

	@Column({
		nullable: true
	})
	character: string;

	@Column({
		type: 'bytea',
		nullable: true
	})
	characterImage: Buffer;

	@Column({
		nullable: true
	})
	isAdmin: boolean;

	@OneToMany(() => History, history => history.player, {
		onDelete: 'CASCADE'
	})
	history: Relation<History[]>;

	@Column({
		nullable: true
	})
	team: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	constructor(id: number) {
		this.id = id;
	}
}
