// src/services/ProspectDetailServices.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/prospectDetail",
  // you can add timeout if needed
});

<<<<<<< HEAD
// Create a new prospect (returns document)
export const createProspectDetail = async (formData: FormData) => {
  const res = await api.post("/", formData, {
=======
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
>>>>>>> edcc113ceb9efe23fd06c2534e3c67c5378efc78
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// Fetch prospects with pagination -> returns { data, total }
export const fetchProspects = async (
  page = 1,
  limit = 30,
  search = "",
  filters: Record<string, string> = {}
) => {
  const params: any = { page, limit };
  if (search) params.search = search;
  Object.assign(params, filters);
  const res = await api.get("/", { params });
  return { data: res.data.data ?? [], total: res.data.total ?? 0 };
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

// Delete prospect by ID
export const deleteProspect = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
