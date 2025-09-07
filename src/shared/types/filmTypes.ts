export interface FilmResponse {
  message: string;
  result: FilmResult;
}

export interface FilmResult {
  uid: string;
  properties: FilmProperties;
}

export interface FilmProperties {
  title: string;
  episode: string;
  director: string;
  url: string;
}

export type Film = FilmProperties & { id: string };

export interface FilmsDataState {
  filmItems: Film[];
  loadingFilm: boolean;
  errorFilm: string | null;
}

export const initialState: FilmsDataState = {
  filmItems: [],
  loadingFilm: false,
  errorFilm: null,
};
