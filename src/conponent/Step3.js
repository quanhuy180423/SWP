import React, { useState, useEffect } from "react";
import { getAllGem } from "../server/api";
import DiamondList from "./DiamondList";
import { TextField, Button, Grid } from "@mui/material";

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
          Step 3: Chi tiết kim cương
        </h2>
        <DiamondList diamonds={diamonds} />
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
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Số lượng"
              value={localData.quantityGem}
              InputProps={{
                readOnly: true,
              }}
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
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Trở lại
          </Button>
          <Button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
          >
            Tiếp tục
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
