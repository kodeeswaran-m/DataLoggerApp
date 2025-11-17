// services/ProspectDetailServices.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/prospectDetail"; // note lowercase

export const fetchProspects = async (page = 1, limit = 20) => {
  const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return res.data;
};

// POST form-data with file upload
export const createProspect = async (formData: FormData) => {
  // Let axios set Content-Type (including boundary) automatically. Don't set header manually.
  const res = await axios.post(API_URL, formData);
  return res.data;
};
