import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import mongoose from "mongoose";
import Product from "../../models/Product";

const Viewproducts = ({ products }) => {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <AllProducts products={products} />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find()
  //  res.status(200).json({ products })
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default Viewproducts;
