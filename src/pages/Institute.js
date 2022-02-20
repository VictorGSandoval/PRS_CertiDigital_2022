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
  deleteInstitute,
  getInstitutes,
  postInstitute,
  updateInstitute,
} from "../helpers/institute";
import toast, { Toaster } from "react-hot-toast";

const initialInstitute = {
  ruc: "",
  name: "",
  address: "",
  email: "",
};

const listInstitute = [
  { value: "Valle Grande", label: "Valle Grande" },
  { value: "Condoray", label: "Condoray" },
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

export const Institute = () => {
  const [institute, setInstitute] = useState(initialInstitute);
  const [institutes, setInstitutes] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [update, setUpdate] = useState(false);

  const updateInstitutes = () => {
    getInstitutes().then((institutesNew) => {
      console.log(institutesNew);
      setInstitutes(institutesNew);
    });
  };

  const handleChangueInstitute = (event) => {
    setInstitute({ ...institute, [event.target.name]: event.target.value });
  };

  // const handleChangueInstituteA = (event) => {
  //   setInstitute({ ...institute, institute: event.target.value });
  //   setListCareers(
  //     listCareersInitial.filter((careers) => careers.id === event.target.value)
  //   );
  // };

  const deleteInstituteSelect = (instituteSelected) => {
    const deleteId = instituteSelected.id;
    console.log(deleteId);
    const res = deleteInstitute(deleteId);
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Se elimino con exito!",
    });
    //updateInstitutes();
    setInstitute(initialInstitute);
    setUpdate(false);
  };


  const updateInstituteSelect = () => {
    const updateId = institute.id;
    const res = updateInstitute(updateId, institute);
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Se actualizo con exito!",
    });
    //updateInstitutes();
    setInstitute(initialInstitute);
    setUpdate(false);
  };


  const handleUpdateInstituteSelect = (instituteSelected) => {
    setUpdate(true);
    setInstitute(instituteSelected);
    setListCareers(
      listCareersInitial.filter(
        (careers) => careers.id === instituteSelected.institute
      )
    );
  };


  const sendInstitute = () => {
    const res = postInstitute({ ...institute, status: "ACTIVATED" });
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Enviado con exito!",
    });
    setInstitute(initialInstitute);
  };

  useEffect(() => {
    updateInstitutes();
  }, []);

  useEffect(() => {
    updateInstitutes();
  }, [institutes]);

  return (
    <>
      <Form title="Instituto">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={institute.name}
              onChange={handleChangueInstitute}
              name="name"
              label="Nombre"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="RUC"
              type="number"
              value={institute.ruc}
              onChange={handleChangueInstitute}
              name="ruc"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={institute.email}
              onChange={handleChangueInstitute}
              name="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Dirección"
              value={institute.address}
              onChange={handleChangueInstitute}
              name="address"
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            {!update ? (
              institute.name !== "" &&
              institute.ruc !== "" &&
              institute.email !== "" &&
              institute.address !== "" ? (
                <Button variant="contained" onClick={sendInstitute}>
                  Enviar
                </Button>
              ) : (
                <Button variant="contained" disabled onClick={sendInstitute}>
                  Enviar
                </Button>
              )
            ) : (
              <Button variant="contained" onClick={updateInstituteSelect}>
                Modificar
              </Button>
            )}
          </Grid>
        </Grid>
      </Form>
      <TableC title="Lista de Intitutos">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>RUC</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {institutes.map((institute) => (
                <TableRow
                  key={institute.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {institute.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {institute.ruc}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {institute.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {institute.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() => handleUpdateInstituteSelect(institute)}
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
                          onClick={() => deleteInstituteSelect(institute)}
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

export default Institute;
