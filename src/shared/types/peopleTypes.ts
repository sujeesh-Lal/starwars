// Types
export interface PeopleListResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: PersonResults[];
}

export interface PersonResults {
  uid: string;
  properties: PersonProperties;
}

export interface PersonProperties {
  name: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  url: string;
  eye_color: string;
  homeworld: string; 
  films: string[]; 
  starships: string[];
}

export type FlattenedPerson = PersonProperties & { id: string };

export interface FlattenedPeopleListResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: FlattenedPerson[];
}

export interface PeopleDataState {
  data: Record<string, FlattenedPerson[]>;
  pagesLoaded: string[];  
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null; 
  loadingPeople: boolean;
  errorPeople: string | null;
}


// Initial state
export const initialState: PeopleDataState = {
  data: {
  },
  total_records: 0,
  total_pages: 0,
  previous: null,
  next: null,
  pagesLoaded: [],
  loadingPeople: false,
  errorPeople: null,
};


export interface FetchPeopleParams {
  page: string;
}

export interface FetchPeopleReturnParams {
  page: string;
  people: FlattenedPerson[];
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
}