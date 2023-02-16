export interface Character {
  MHName: string;
  characterImage: Buffer;
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
  image?: Buffer;
  playerChoice: string;
  answer: string;
  proof?: string;
  result: boolean;
}

export interface reponse {
  id?: number;
  answer?: string;
  answerId?: number | null;
}

export interface QuestionDisplayed {
  id: number;
  image?: Buffer;
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
