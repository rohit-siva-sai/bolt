import React from 'react'
import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

const Viewproducts = () => {
    return (
        <ThemeProvider theme={theme}>
          <FullLayout>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={12}>
                <ProductPerfomance />
              </Grid>
            </Grid>
          </FullLayout>
        </ThemeProvider>
      );
}

export default Viewproducts
