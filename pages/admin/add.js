import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { useState } from "react";

const Add = () => {
  const [form, setForm] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
};
 
const submitForm = (e)=>{
    e.preventDefault()
    console.log('submit');
    
}

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        {/* <h2 className='text-stone-600 text-2xl font-serif font-bold text-center '></h2> */}
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField
                  value={form.title? form.title: ""}
                  onChange={handleChange}
                  name="title"
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  value={form.type? form.type: ""}
                  onChange={handleChange}
                  name="type"
                  label="Type"
                  variant="outlined"
                />
                <TextField
                  value={form.size? form.size:""}
                  onChange={handleChange}
                  name="size"
                  label="Size"
                  variant="outlined"
                />
                <TextField
                  value={form.color? form.color:""}
                  onChange={handleChange}
                  name="color"
                  label="Color"
                  variant="outlined"
                />
                <TextField
                  value={form.slug? form.slug: ""}
                  onChange={handleChange}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />
                <TextField
                  value={form.description? form.description: ""}
                  onChange={handleChange}
                  name="description"
                  label="Text Area"
                  multiline
                  rows={4}
                  defaultValue=""
                />
                {/* <TextField
              error
              name="er-basic"
              label="Error"
              defaultValue="ad1avi"
              variant="outlined"
            /> */}
                {/* <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Terms & Condition"
              />
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="Disabled"
              />
            </FormGroup> */}
                {/* <FormControl>
              <FormLabel name="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl> */}
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>

          {/* <Grid item xs={12} lg={12}>
        <BaseCard title="Form Design Type">
          <Stack spacing={3} direction="row">
            <TextField
              name="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField name="filled-basic" label="Filled" variant="filled" />
            <TextField
              name="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Stack>
        </BaseCard>
      </Grid> */}
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Add;
