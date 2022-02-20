import axios from "axios";

const URL = "http://localhost:9090/repository/institutes";

export const getStudents = async () => {
  const res = await axios.get(URL);
  const students = res.data;
  return students;
};

export const postStudent = async (data) => {
  const res = await axios.post(URL, data);
  return res;
};

export const deleteStudent = async (idStudent) => {
  const res = await axios.delete(URL+"/"+idStudent)
  return res

}

export const updateStudent = async (idStudent, data) => {
  console.log(data)
  console.log(idStudent)
  const res = await axios.put(URL+"/"+idStudent, data)
  return res
}