// src/services/DemoServices.ts
import axios from "axios";


const API_URL = "http://localhost:5000/api/ProspectDetail";

export type ProspectPayload = FormData; // since we upload file

// POST with multipart/form-data
export const createProspectDetail = async (data: ProspectPayload) => {
  const res = await axios.post(API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
