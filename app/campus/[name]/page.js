"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { Button, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";

const drawerWidth = 310;

function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function SelectClasses({ params }) {
  const [courseAttribute, setCourseAttribute] = useState("");
  const [allMajors, setAllMajors] = useState([]);
  const labelName = capitalizeFirstLetter(params?.name) || "Majors";
  const [searchQuery, setSearchQuery] = useState(""); // state to keep track of the search input
  const [classes, setClasses] = useState([
    { id: 1, title: "Biology", completed: false },
    { id: 2, title: "Chemistry", completed: false },
    { id: 3, title: "Physics", completed: false },
    { id: 4, title: "Calculus", completed: false },
    { id: 5, title: "Statistics", completed: false },
    { id: 6, title: "Psychology", completed: false },
    { id: 7, title: "Computer Science", completed: false },
    { id: 8, title: "Economics", completed: false },
    { id: 9, title: "Political Science", completed: false },
    { id: 10, title: "Philosophy", completed: false },
    { id: 11, title: "History", completed: false },
    { id: 12, title: "English", completed: false },
    { id: 13, title: "Art", completed: false },
    { id: 14, title: "Music", completed: false },
    { id: 15, title: "Theater", completed: false },
  ]);

  useEffect(() => {
    async function fetchMajors() {
      try {
        const response = await fetch(`http://localhost:8000/${params?.name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllMajors(data);
      } catch (error) {
        console.error("Fetching majors failed: ", error);
      }
    }

    if (params?.name) {
      fetchMajors();
    }
  }, [params?.name]);

  const handleToggleClass = (id) => {
    const updatedClasses = classes.map((cls) =>
      cls.id === id ? { ...cls, completed: !cls.completed } : cls
    );
    setClasses(updatedClasses);

    // If the class is now completed, add it to the selectedCoursed, otherwise remove it
    const selectedClass = updatedClasses.find((cls) => cls.id === id);
    setSelectedCoursed((prevSelected) =>
      selectedClass.completed
        ? [...prevSelected, selectedClass.title]
        : prevSelected.filter((title) => title !== selectedClass.title)
    );
  };

  // Example list of majors and course attributes

  const [usersMajor, setUsersMajor] = useState("");
  const courseAttributes = ["QUOT", "BIB", "JHS", "JTS"];
  const [selectedCoursed, setSelectedCoursed] = useState([]);

  // Function to filter classes based on the search query
  const filteredClasses = classes.filter((cls) =>
    cls.title
      ? cls.title.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider>
          <Chip label="What's Your Major" color="primary" />
        </Divider>
        <List>
          <ListItem>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={allMajors}
              sx={{
                width: "100%",
                [(theme) => theme.breakpoints.up("sm")]: {
                  width: "50%",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="primary"
                  label={`${labelName} Majors`}
                />
              )}
            />
          </ListItem>
        </List>
        <Divider>
          <Chip label="Search and Filter" color="primary" />
        </Divider>
        <List>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search classes"
              value={searchQuery}
              // Update the searchQuery state when the text changes
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </ListItem>

          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Course Attribute</InputLabel>
              <Select
                value={courseAttribute}
                onChange={(e) => setCourseAttribute(e.target.value)}
                label="Course Attribute"
              >
                {courseAttributes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" fullWidth>
              Search
            </Button>
          </ListItem>
        </List>
        <Divider>
          <Chip label="Selected Courses" color="primary" />
        </Divider>
        <List>
          {selectedCoursed.length > 0 ? (
            selectedCoursed.map((course, index) => (
              <ListItem key={index}>
                <Chip
                  label={course}
                  onDelete={() =>
                    handleToggleClass(
                      classes.find((cls) => cls.title === course).id
                    )
                  }
                  color="primary"
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="body2" color="textSecondary" align="center">
                No courses selected yet.
              </Typography>
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem>
            <Button variant="contained" color="primary" fullWidth>
              Advise Me
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Typography variant="h3" color="secondary" align="center" gutterBottom>
          Classes
        </Typography>

        {filteredClasses.map(
          (
            cls // Render the filtered classes
          ) => (
            <Paper key={cls.id} elevation={2} sx={{ mb: 2, p: 2 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cls.completed}
                      onChange={() => handleToggleClass(cls.id)}
                      color="primary"
                    />
                  }
                  label={cls.title}
                />
              </FormGroup>
            </Paper>
          )
        )}
      </Box>
    </Box>
  );
}
