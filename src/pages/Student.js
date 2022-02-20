import Form from "../components/Form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TableC from "../components/Table";
import {
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  deleteStudent,
  getStudents,
  postStudent,
  updateStudent,
} from "../helpers/student";

import {
  getInstitutes
} from "../helpers/institute";
import toast, { Toaster } from "react-hot-toast";

const initialStudent = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  phone: "",
  institute: "",
  careers: "",
  password: "",
  area: "",
  rol: "",
};

const listInstitute = [
  { value: "Valle Grande", label: "Valle Grande" },
  { value: "Condoray", label: "Condoray" },
];

const listAreaInitial = [
  { value: "Administrativa", label: "Administrativa" },
  { value: "Academica", label: "Academica" },
  { value: "Tesorería", label: "Tesorería" },
  { value: "Secretaría Académica", label: "Secretaría Académica" },
];

const listRolInitial = [
  { value: "STUDENT", label: "STUDENT" },
  { value: "COLABORATOR", label: "COLABORATOR" },
  { value: "ADMINISTRATOR", label: "ADMINISTRATOR" }
];

const listCareersInitial = [
  {
    id: "Valle Grande",
    value: "Analisis de sistemas",
    label: "Analisis de Sistemas",
  },
  {
    id: "Valle Grande",
    value: "Produccion Agraria",
    label: "Produccion Agraria",
  },
  { id: "Condoray", value: "Contador", label: "Contador" },
  { id: "Condoray", value: "Administracion", label: "Administracion" },
];


export const Student = () => {
  const [student, setStudent] = useState(initialStudent);
  const [students, setStudents] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [listArea, setListArea] = useState([]);
  const [listRol, setListRol] = useState([]);
  const [institutes, setInstitutes] = useState([]);



  const handleChangueStudent = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleChangueInstitute = (event) => {
    setStudent({ ...student, institute: event.target.value });
    setListCareers(
      listCareersInitial.filter((careers) => careers.id === event.target.value)
    );
    setListArea(
      listAreaInitial
    )
    setListRol(
      listRolInitial
    )
  };

  const deleteStudentSelect = (studentSelected) => {
    const deleteId = studentSelected.id;
    console.log(deleteId);
    const res = deleteStudent(deleteId);
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Se elimino con exito!",
    });
    updateStudents();
  };

  const updateStudentSelect = () => {
    const updateId = student.id;
    const res = updateStudent(updateId, student);
    console.log(student)
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Se actualizo con exito!",
    });
    setStudent(initialStudent)
    setUpdate(false);
  };

  const handleUpdateStudentSelect = (studentSelected) => {
    setUpdate(true);
    setStudent(studentSelected);
    setListCareers(
      listCareersInitial.filter(
        (careers) => careers.id === studentSelected.institute
      )
    );
  };

  const sendStudent = () => {
    const res = postStudent({ ...student, status: "ACTIVATED" });
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Enviado con exito!",
    });
    updateStudents();
  };

  const updateStudents = () => {
    getStudents().then((studentsNew) => {
      console.log(studentsNew);
      setStudents(studentsNew);
    });

  };

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      getStudents().then((studentsNew) => {
        if (mounted) {
          setStudents(studentsNew);
        }
        
      });

    } 

    loadData()

    return () => {
      mounted = false
    }

  },[students])



  return (
    <>
      <Form title="Usuario">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={student.name}
              onChange={handleChangueStudent}
              name="name"
              label="Nombre"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Apellido"
              value={student.lastname}
              onChange={handleChangueStudent}
              name="lastname"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={student.email}
              onChange={handleChangueStudent}
              name="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DNI"
              type="number"
              value={student.dni}
              onChange={handleChangueStudent}
              name="dni"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Celular"
              type="number"
              value={student.phone}
              onChange={handleChangueStudent}
              name="phone"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Instituto</InputLabel>
              <Select
                label="Instituto"
                name="institute"
                value={student.institute}
                onChange={handleChangueInstitute}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {listInstitute.map((institute) => (
                  <MenuItem key={institute.value} value={institute.value}>
                    {institute.label}
                  </MenuItem>
                ))}

                {/* {institutes.map((institute) => (
                  <MenuItem key={institute.id} value={institute.name}>
                    {institute.label}
                  </MenuItem>
                ))} */}

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                name="rol"
                value={student.rol}
                onChange={handleChangueStudent}
              >
                {listRol.map((rol) => (
                  <MenuItem key={rol.value} value={rol.value}>
                    {rol.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Carrera</InputLabel>
              <Select
                label="Carrera"
                name="careers"
                value={student.careers}
                onChange={handleChangueStudent}
              >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {listCareers.map((careers) => (
                    <MenuItem key={careers.value} value={careers.value}>
                      {careers.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {
            student.rol == "COLABORATOR" || student.rol == "ADMINISTRATOR" ? 
            <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Area</InputLabel>
              <Select
                label="Area"
                name="area"
                value={student.area}
                onChange={handleChangueStudent}
              >
                  <MenuItem key={"Ninguno"} value={"Ninguno"}>
                    <em>Ninguno</em>
                  </MenuItem>
                  {listArea.map((area) => (
                    <MenuItem key={area.value} value={area.value}>
                      {area.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          : <></>
          }

          
          
          <Grid item xs={6}>
            <TextField
              label="Contraseña"
              type="password"
              value={student.password}
              onChange={handleChangueStudent}
              name="password"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            {!update ? (
              student.name !== "" &&
              student.lastname !== "" &&
              student.email !== "" &&
              student.careers !== "" &&
              student.institute !== "" &&
              student.dni !== "" &&
              student.password !== "" &&
              student.rol !== "" &&
              student.phone !== "" ? (
                <Button variant="contained" onClick={sendStudent}>
                  Enviar
                </Button>
              ) : (
                <Button variant="contained" disabled onClick={sendStudent}>
                  Enviar
                </Button>
              )
            ) : (
              <Button variant="contained" onClick={updateStudentSelect}>
                Modificar
              </Button>
            )}
          </Grid>
        </Grid>
      </Form>
      <TableC title="Lista de usuarios">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Instituto</TableCell>
                <TableCell>Carrera</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Area</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {student.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.lastname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.phone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.dni}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.institute}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.careers}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.rol}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.area}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() => handleUpdateStudentSelect(student)}
                        >
                          <EditIcon />
                        </Fab>
                      </Button>
                      <Button>
                        {" "}
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="edit"
                          onClick={() => deleteStudentSelect(student)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableC>
      <Toaster />
    </>
  );
};

export default Student;
