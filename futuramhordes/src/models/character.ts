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
