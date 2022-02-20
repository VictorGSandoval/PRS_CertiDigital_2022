import {
  Button,
  ButtonGroup,
  Fab,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "../components/Form";
import { FormControl } from "@mui/material";
import TableC from "../components/Table";
import { TableContainer } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";

const listInstitute = [
  { id: 1, name: "Valle Grande" },
  { id: 2, name: "Condoray" },
  { id: 3, name: "Telesup" },
  { id: 4, name: "Taylor" },
  { id: 5, name: "Senati" },
  { id: 6, name: "San Jose" },
];

const listCareers = [
  { id: 1, name: "Analisis de Sistema", institute: "Valle Grande" },
  { id: 2, name: "Produccion Agraria", institute: "Valle Grande" },
  { id: 3, name: "Administracion", institute: "Condoray" },
  { id: 4, name: "Hoteleria y turismo", institute: "Condoray" },
];

const Career = () => {
  return (
    <>
      <Form title="Carrera">
        <Grid container spacing={2}>
          <Grid item>
            <TextField label="Instituto" />
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel>Instituto</InputLabel>
              <Select label="Instituto">
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {listInstitute.map((institute) => (
                  <MenuItem value={institute.id}>{institute.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">
              <SendIcon />
              {"Enviar"}
            </Button>
          </Grid>
        </Grid>
      </Form>
      <TableC>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Carrera</TableCell>
                <TableCell>Instituto</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCareers.map((careers) => (
                <TableRow key={careers.id}>
                  <TableCell>{careers.name}</TableCell>
                  <TableCell>{careers.institute}</TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
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
    </>
  );
};

export default Career;
