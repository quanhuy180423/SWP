import React, { useState, useEffect } from "react";
import { getAllGem } from "../server/api";

import { TextField, Button, Grid, colors } from "@mui/material";
import Step3ListDiamond from "./Step3_1";

const Step3 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [localData, setLocalData] = useState({
    diamondId: formData.diamondId || "",
    quantityGem: formData.quantityGem || 0,
  });
  const [diamonds, setDiamonds] = useState([]);
  const [gemIdError, setGemIdError] = useState("");

  useEffect(() => {
    const getDiamonds = async () => {
      try {
        const response = await getAllGem();
        setDiamonds(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDiamonds();
  }, []);

  const handleGemIdChange = (e) => {
    const gemId = e.target.value;
    const updatedData = { ...localData, diamondId: gemId };

    // Check if gemId exists in diamonds array
    const gemExists = diamonds.some(
      (diamond) => String(diamond.GemId) === gemId
    );

    if (gemExists) {
      setGemIdError("");
      updatedData.quantityGem = 1;
    } else {
      setGemIdError("Nhập sai mã Gem ID");
      updatedData.quantityGem = 0;
    }

    setLocalData(updatedData);
    updateFormData(updatedData);
  };

  const handleChoose = (gemId) => {
    const updatedData = { diamondId: gemId, quantityGem: 1 };
    setLocalData(updatedData);
    updateFormData(updatedData);
    setGemIdError(""); // Clear any previous error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(localData);
    nextStep();
  };

  return (
    <div>
      <form
        className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto mb-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-5 text-2xl text-gray-800">
          Step 3: Detailed Diamond
        </h2>
        <Step3ListDiamond diamonds={diamonds} onChoose={handleChoose} />
        <Grid container spacing={2} mt={2} mb={2} justifyContent="center">
          <Grid item xs={6}>
            <TextField
              label="Gem ID"
              name="diamondId"
              value={localData.diamondId}
              onChange={handleGemIdChange}
              error={!!gemIdError}
              helperText={gemIdError}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Số lượng"
              value={localData.quantityGem}
              InputProps={{
                readOnly: true,
              }}
              disabled
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => {
              updateFormData(localData);
              prevStep();
            }}
            style={{ backgroundColor: colors.red[200], color: "black" }}
          >
            Back
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: colors.blue[200], color: "black" }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
