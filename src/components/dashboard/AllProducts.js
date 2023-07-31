import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useEffect } from "react";

const AllProducts = ({ products }) => {
  useEffect(() => {
    // console.log(products);
  }, []);
  return (
    <div>
      <BaseCard className="" title="Products">
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            // whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="h6"
                  className="text-center"
                >
                  Size
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  color="textSecondary"
                  variant="h6"
                  className="text-center"
                >
                  Slug
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Color
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Price
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow key={product.slug}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {product.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* <Box
                  sx={{
                    // display: "flex",
                    // alignItems: "center",
                  }}
                >
                  <Box> */}

                    <Typography>
                      <img src={product.img} alt="" className="w-20 h-20" />
                    </Typography>

                    {/* </Box>
                </Box> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      className="text-center font-bold text-black"
                      color="textSecondary"
                      sx={{
                        fontSize: "400",
                      }}
                    >
                      {product.size}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      className="text-center"
                    >
                      {product.slug}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor: product.color,
                        color: "#fff",
                      }}
                      size="small"
                      label={product.color}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">₹{product.price}.00</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </BaseCard>
    </div>
  );
};

export default AllProducts;
