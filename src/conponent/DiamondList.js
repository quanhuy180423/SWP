import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DiamondList = ({ diamonds = [] }) => {
  const handleViewDetails = (gemId) => {
    console.log(`Viewing details for GemID: ${gemId}`);
  };

  return (
    <div className="w-full flex justify-center">
      <TableContainer
        component={Paper}
        style={{ width: "80%", container: "center" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>GemID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Color</StyledTableCell>
              <StyledTableCell>Cara Weight (ct)</StyledTableCell>
              <StyledTableCell>Clarity</StyledTableCell>
              <StyledTableCell>Cut</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diamonds.map((diamond) => (
              <StyledTableRow key={diamond.GemId}>
                <StyledTableCell component="th" scope="row">
                  {diamond.GemId}
                </StyledTableCell>
                <StyledTableCell>{diamond.Name}</StyledTableCell>
                <StyledTableCell>{diamond.Color}</StyledTableCell>
                <StyledTableCell>{diamond.CaraWeight}</StyledTableCell>
                <StyledTableCell>{diamond.Clarity}</StyledTableCell>
                <StyledTableCell>{diamond.Cut}</StyledTableCell>
                <StyledTableCell>{diamond.Size}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(diamond.GemId)}
                  >
                    View Details
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DiamondList;
