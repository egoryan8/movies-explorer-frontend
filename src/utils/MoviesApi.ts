export interface MovieI {
  id: number,
  nameRU: string,
  nameEN: string,
  director: string,
  country: string,
  year: string,
  duration: 61,
  description: string,
  trailerLink: string,
  "created_at": string,
  "updated_at": string,
  image: any
}

const handleResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
}

export const getFilms = async (): Promise<MovieI[]> => {
  const movies = await fetch('https://api.nomoreparties.co/beatfilm-movies');
  return await handleResponse(movies);
}