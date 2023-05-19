import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ProjectTable from './ProjectTable';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const EmployeeTable = ({ employees }) => {
  const [filteredRows, setFilteredRows] = useState(employees);
  const [filterName, setFilterName] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');
  const [filterSkills, setFilterSkills] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  const handleFilterByName = (event) => {
    const name = event.target.value.toLowerCase();
    setFilterName(name);
    applyFilters(name, filterDesignation, filterSkills);
  };

  const handleFilterByDesignation = (event) => {
    const designation = event.target.value;
    setFilterDesignation(designation);
    applyFilters(filterName, designation, filterSkills);
  };

  const handleFilterBySkills = (event) => {
    const skills = event.target.value.toLowerCase();
    setFilterSkills(skills);
    applyFilters(filterName, filterDesignation, skills);
  };

  const applyFilters = (name, designation, skills) => {
    const filteredData = employees.filter(
      (employee) =>
        employee.name &&
        employee.name.toLowerCase().includes(name) &&
        (designation === '' || employee.designation === designation) &&
        (skills === '' ||
          (employee.skills &&
            employee.skills.some((skill) =>
              skill.toLowerCase().includes(skills)
            )))
    );
    setFilteredRows(filteredData);
  };

  const handleThemeChange = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'designation', headerName: 'Designation', width: 150 },
    { field: 'skills', headerName: 'Skills', width: 250 },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <FormControlLabel
          control={
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          }
          label="Dark Theme"
        />
      </GridToolbarContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="EmployeeTable">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search by Name"
              variant="outlined"
              value={filterName}
              onChange={handleFilterByName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Designation</InputLabel>
              <Select
                value={filterDesignation}
                onChange={handleFilterByDesignation}
                label="Select Designation"
              >
                <MenuItem value="">All Designations</MenuItem>
                <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search by Skills"
              variant="outlined"
              value={filterSkills}
              onChange={handleFilterBySkills}
              fullWidth
            />
          </Grid>
        </Grid>

        <DataGrid
          rows={filteredRows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
      <ProjectTable employees={employees} />
    </ThemeProvider>
  );
};

export default EmployeeTable;
