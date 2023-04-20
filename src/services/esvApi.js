const BASE_URL = "https://api.esv.org/v3";

async function httpGet(path) {
  try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
      method: "GET",
      withCredentials: true,
      credentials: "omit",
      headers: {
        Authorization: `Token ${import.meta.env.VITE_ESV_TOKEN}`,
      },
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function getSearch(term, page = 1) {
  const path = `/passage/search?q=${term}&page=${page}`;
  return httpGet(path);
}
