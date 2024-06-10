export const getNewsByQuery = async (query) => {
  const response = await fetch(`/api/search?query=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data;
};
