//file to grab data from our endpoint and throw it back to our client
//since were using dotenv, were not calling the third party API directly
API_BASE_URL = "/api";

export function fetchHeroById(id) {
  const url = API_BASE_URL + "/heroes" + id;
  return fetch(url)
    .then(function (response) {
      // check status here
      if (!response.ok) {
        throw new Error("Hero not found");
      }
      return response.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      throw error;
    });
}
