export type Show = {
  showId: number;
  title: string;
  genre: string;
  bannerUrl: string;
  thumbnailUrl: string;
  description: string;
  concept: string;
  streamingServices: string;
  startDate: Date;
  endDate: Date;
  running: boolean;
  seasons: Season[];
};

export type Person = {
  personId: string;
  name: string;
  birthDate: string;
  imageUrl: string;
};

export type Season = {
  seasonId: string;
  startDate: string;
  endDate: string;
  show: number;
  seasonNumber: number;
  participants: Person[];
  moderators: Person[];
  teams: Team[];
};

export type Team = {
  teamId: string;
  name: string;
  members: Person[];
};