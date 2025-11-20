import axios from "axios";
 
const api = axios.create({
  baseURL: "http://localhost:5000/api/prospectDetail",
  // you can add timeout if needed
});
const API_URL="http://localhost:5000/api/prospectDetail"
 
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
 
 
 
// POST with multipart/form-data
export const createProspectDetail = async (data: ProspectPayload) => {
  console.log("form data from service", data);
  const res = await axios.post(API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};
 
 
// Get single prospect by ID (returns document)
export const getProspectById = async (id: string) => {
  const res = await api.get(`/${id}`);
  return res.data.data;
};
 
// Update prospect by ID (multipart/form-data)
export const updateProspect = async (id: string, formData: FormData) => {
  const res = await api.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};