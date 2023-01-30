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

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	constructor(id: number) {
		this.id = id;
	}
}
