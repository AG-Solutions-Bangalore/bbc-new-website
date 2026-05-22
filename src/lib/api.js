const API_BASE_URL = "https://businessboosters.club/public/api";
const USER_IMAGE_BASE_URL =
  "https://businessboosters.club/public/images/user_images";

let usersCache = null;
let usersPromise = null;

export const getUserImageUrl = (image) =>
  image ? `${USER_IMAGE_BASE_URL}/${image}` : `${USER_IMAGE_BASE_URL}/no_images.png`;

export async function fetchUsers() {
  if (usersCache) return usersCache;

  if (!usersPromise) {
    usersPromise = fetch(`${API_BASE_URL}/getUser`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        usersCache = Array.isArray(data?.profile) ? data.profile : [];
        return usersCache;
      })
      .catch((error) => {
        usersPromise = null;
        throw error;
      });
  }

  return usersPromise;
}

export async function updateVisitorCount() {
  const response = await fetch(`${API_BASE_URL}/updateVisitorCount`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to update visitor count: ${response.status}`);
  }

  return response.json();
}
