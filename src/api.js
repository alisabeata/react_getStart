export const fetchShow = showId =>
  fetch(
    `http://api.tvmaze.com/shows/${showId}?embed=cast`,
    {
      method: 'GET',
      mode: 'cors'
    }
  ).then(response => response.json());
