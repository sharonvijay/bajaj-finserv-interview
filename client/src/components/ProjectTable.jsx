import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';

const ProjectTable = ({ employees }) => {
  const [filteredProjects, setFilteredProjects] = useState(
    employees.reduce((allProjects, employee) => {
      if (employee.projects) {
        return allProjects.concat(employee.projects);
      }
      return allProjects;
    }, [])
  );

  const handleFilterByName = (event) => {
    const projectName = event.target.value.toLowerCase();
    const filteredData = employees.reduce((allProjects, employee) => {
      if (employee.projects) {
        const filteredProjects = employee.projects.filter((project) =>
          project.name.toLowerCase().includes(projectName)
        );
        return allProjects.concat(filteredProjects);
      }
      return allProjects;
    }, []);
    setFilteredProjects(filteredData);
  };

  const handleFilterByTeamSize = (event) => {
    const teamSize = parseInt(event.target.value);
    const filteredData = employees.reduce((allProjects, employee) => {
      if (employee.projects) {
        const filteredProjects = employee.projects.filter(
          (project) => project.team && project.team.length === teamSize
        );
        return allProjects.concat(filteredProjects);
      }
      return allProjects;
    }, []);
    setFilteredProjects(filteredData);
  };

  const handleFilterByCompletedTasks = (event) => {
    const completedTasks = parseInt(event.target.value);
    const filteredData = employees.reduce((allProjects, employee) => {
      if (employee.projects) {
        const filteredProjects = employee.projects.filter((project) => {
          const completedTaskCount = project.tasks
            ? project.tasks.filter((task) => task.status === 'Completed').length
            : 0;
          return completedTaskCount === completedTasks;
        });
        return allProjects.concat(filteredProjects);
      }
      return allProjects;
    }, []);
    setFilteredProjects(filteredData);
  };

  return (
    <div className="ProjectTable">
      <h2>Projects</h2>
      <div className="ProjectSearch">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filter by Project Name"
              variant="outlined"
              onChange={handleFilterByName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filter by Team Size"
              variant="outlined"
              type="number"
              onChange={handleFilterByTeamSize}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Filter by Completed Tasks"
              variant="outlined"
              type="number"
              onChange={handleFilterByCompletedTasks}
            />
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2}>
        {filteredProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${project.name}-${index}`}>
            <div className="project-card">
              <h3>{project.name}</h3>
              <p>Team Size: {project.team ? project.team.length : 0}</p>
              <p>
                Completed Tasks:{' '}
                {project.tasks
                  ? project.tasks.filter((task) => task.status === 'Completed').length
                  : 0}
              </p>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProjectTable;
