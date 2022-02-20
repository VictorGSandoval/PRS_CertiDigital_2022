import axios from "axios";

const URL = "http://localhost:9090/repository/institutes";

export const getInstitutes = async () => {
  const res = await axios.get(URL);
  const institutes = res.data;
  return institutes;
};

export const postInstitute = async (data) => {
  const res = await axios.post(URL, data);
  return res;
};

export const deleteInstitute = async (idInstitute) => {
  const res = await axios.delete(URL+"/"+idInstitute)
  return res

}

export const updateInstitute = async (idInstitute, data) => {
  const res = await axios.put(URL+"/"+idInstitute, data)
  return res
}