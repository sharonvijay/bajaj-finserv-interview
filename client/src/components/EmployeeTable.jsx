import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton,} from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Switch, FormControlLabel } from '@mui/material';

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
    const filteredData = employees.filter((employee) =>
      employee.name && employee.name.toLowerCase().includes(name) &&
      (designation === '' || employee.designation === designation) &&
      (skills === '' || (employee.skills && employee.skills.some((skill) => skill.toLowerCase().includes(skills))))
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
\        <FormControlLabel
          control={<Switch checked={isDarkTheme} onChange={handleThemeChange} />}
          label="Dark Theme"
        />
      </GridToolbarContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='EmployeeTable'>
        <div>
          <input
            type="text"
            placeholder="Search by Name"
            onChange={handleFilterByName}
          />

          <select value={filterDesignation} onChange={handleFilterByDesignation}>
            <option value="">All Designations</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="Project Manager">Project Manager</option>
          </select>

          <input
            type="text"
            placeholder="Search by Skills"
            onChange={handleFilterBySkills}
          />
        </div>

        <DataGrid
          rows={filteredRows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default EmployeeTable;
