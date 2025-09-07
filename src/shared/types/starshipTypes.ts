export interface StarshipResponse {
  message: string;
  result: StarshipResult;
}

export interface StarshipResult {
  uid: string;
  properties: StarshipProperties;
}

export interface StarshipProperties {
  name: string;
  model: string;
  url: string;
}

export type Starship = StarshipProperties & { id: string };

export interface StarshipState {
  starshipItems: Starship[];
  loadingStarship: boolean;
  errorStarship: string | null;
}

export const initialState: StarshipState = {
  starshipItems: [],
  loadingStarship: false,
  errorStarship: null,
};
