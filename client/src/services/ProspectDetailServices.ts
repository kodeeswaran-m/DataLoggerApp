import axios from "axios";

const API_URL = "http://localhost:5000/api/ProspectDetail";

export const fetchProspects = async (page = 1, limit = 20) => {
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return res.data;
};
