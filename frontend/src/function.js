import axios from 'axios';

export default async function genericConect(methhod, query, body) {
  // console.log(methhod, query, body, localStorage.token, `http://localhost:3000${query}`);

  const res = await axios({
    method: methhod,
    // url: `${query}`,
    url: `http://localhost:3000${query}`,
    data: body,
    headers: { Authorization: localStorage.token || sessionStorage.token || '' },
  });

  // if (!res) throw 'something wrong genericConect'; //TODO if its ever working?

  return res;
}
