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
export class Quiz {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false
	})
	question: string;

	@Column({
		type: 'bytea',
		nullable: true
	})
	image: Buffer | undefined;

	@Column({
		nullable: false
	})
	first: string;

	@Column({
		nullable: false
	})
	second: string;

	@Column({
		nullable: false
	})
	third: string;

	@Column({
		nullable: false
	})
	fourth: string;

	@Column({
		nullable: false
	})
	answer: number;

	@Column({
		nullable: false
	})
	proof: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;

	constructor(
		question: string,
		image: Buffer | undefined,
		first: string,
		second: string,
		third: string,
		fourth: string,
		answer: number,
		proof: string
	) {
		this.question = question;
		this.image = image;
		this.first = first;
		this.second = second;
		this.third = third;
		this.fourth = fourth;
		this.answer = answer;
		this.proof = proof;
	}
}
