// services/ProspectDetailServices.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/ProspectDetail";

export const fetchProspects = async (
  page = 1,
  limit = 20,
  search = "",
  filters: any = {}
) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search: search || "",
    geo: filters.geo || "",
    month: filters.month || "",
    quarter: filters.quarter || "",
    lob: filters.lob || "",
    rag: filters.rag || "",
  }).toString();

  const res = await axios.get(`${API_URL}?${query}`);
  console.log("response data",res.data);
  return res.data;
};

export const deleteProspect = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};




// import axios from "axios";


// const API_URL = "http://localhost:5000/api/ProspectDetail";

// export const fetchProspects = async (page = 1, limit = 20) => {
//   const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
//   return res.data;
// };
