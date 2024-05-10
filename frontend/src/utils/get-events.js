import axios from "axios";

const getEvents = async (currData, page, limit) => {
  const query = `http://localhost:3001/event?page=${page}&limit=${limit}`;
  console.log(page);
  try {
    let response = await axios.get(query);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getEvents;
