export interface Character {
  MHName: string;
  characterImage?: Image;
  character: string;
  description: string;
  fullName?: string;
}

export interface Question {
  id: number;
  question: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
  answer: number;
  proof: string;
  image: Image;
}

export interface Correction {
  id: number;
  question: string;
  image?: Image;
  playerChoice: string;
  answer: string;
  proof?: string;
  result: boolean;
}

export interface Image {
	data: Array<number>;
	type: string;
}



export interface reponse {
  id?: number;
  answer?: string;
  answerId?: number | null;
}

export interface QuestionDisplayed {
  id: number;
  image?: Image;
  question: string;
  answers: Array<string>;
}

export interface Image {
  data: Array<number>;
  type: string;
}

export interface Team {
  teamA: {
    player: Array<Character>;
    point: number;
  };
  teamB: {
    player: Array<Character>;
    point: number;
  };
  teamC: {
    player: Array<Character>;
    point: number;
  };
  teamD: {
    player: Array<Character>;
    point: number;
  };
}
