const BASE_URL = "https://api.github.com/users/";

export async function getUser(username) {
  const res = await fetch(`${BASE_URL}${username}`);
  if (!res.ok) {
    let errorMsg = "User not found";
    try {
      const error = await res.json();
      errorMsg = error.message || errorMsg;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(errorMsg);
  }
  return res.json();
}

export async function getUserRepos(username, page = 1, per_page = 5) {
  const res = await fetch(
    `${BASE_URL}${username}/repos?sort=stars&per_page=${per_page}&page=${page}`
  );
  if (!res.ok) {
    let errorMsg = "Could not fetch repos";
    try {
      const error = await res.json();
      errorMsg = error.message || errorMsg;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(errorMsg);
  }
  return res.json();
}
