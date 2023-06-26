const BASE_URL = "https://api.esv.org/v3";

async function httpGet(path, args) {
  const params = new URLSearchParams(args).toString();
  const url = new URL(`${BASE_URL}${path}?${params}`);
  try {
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
  return httpGet("/passage/search", {
    q: term,
    page,
  });
}

export async function getText(query) {
  return httpGet("/passage/text", {
    q: query,
  });
}
