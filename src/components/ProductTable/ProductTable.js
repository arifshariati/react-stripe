import React from "react";
import numeral from "numeral";
//firebase
import db from "../../firebase";
//mui
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const deleteTransaction = (id) => {
  db.doc(`purchase/${id}`).delete();
};
function ProductTable({ tableData }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Method</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.transaction}>
              <TableCell component="th" scope="row">
                {row.transaction}
              </TableCell>
              <TableCell align="right">
                {numeral(row.amount).format("0,0") + " " + row.currency}
              </TableCell>
              <TableCell align="right">{row.method}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  color={"secondary"}
                  onClick={() => deleteTransaction(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
