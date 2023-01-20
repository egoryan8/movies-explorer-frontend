export interface MovieI {
  _id?: string;
  id?: number;
  movieId?: number,
  nameRU: string,
  nameEN: string,
  director: string,
  country: string,
  year: string,
  duration: 61,
  description: string,
  trailerLink: string,
  image: any,
  type?: string;
}
const formatImage = (movies: MovieI[]) => {
  return movies.map(movie => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      trailerLink: movie.trailerLink,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      image: `https://api.nomoreparties.co${movie.image.url}`,
    }
  })
}
const handleResponse = async (res: Response) => {
  if (res.ok) {
    const movies = await res.json();
    return formatImage(movies);
  }
  const err = await res.json();
  return Promise.reject(err);
}

export const getFilms = async (): Promise<MovieI[]> => {
  const movies = await fetch('https://api.nomoreparties.co/beatfilm-movies');
  return await handleResponse(movies);
}