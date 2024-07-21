import React, { useState, useEffect } from "react";
import { getAllMaterial, getAllCategories } from "../server/api";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  Typography,
  colors,
} from "@mui/material";

const Step2 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [localData, setLocalData] = useState({
    materialId: formData.materialId || "",
    quantityMaterial: formData.quantityMaterial || 0,
    categoryId: formData.categoryId || "",
    size: formData.size || 0,
  });

  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialResponse = await getAllMaterial();
        setMaterials(materialResponse.data);
        console.log(materials);

        const categoryResponse = await getAllCategories();
        setCategories(categoryResponse.data);
        console.log(categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (localData.quantityMaterial < 1) {
      newErrors.quantityMaterial = "Quantity Material must be at least 1";
    }

    if (localData.size <= 9 || localData.size >= 45) {
      newErrors.size = "Size must be greater than 9 and less than 45";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      updateFormData(localData);
      nextStep();
    }
  };

  const getSizeUnit = (categoryId) => {
    const category = categories.find((cat) => cat.CategoryId === categoryId);
    if (category) {
      if (category.Name.toLowerCase() === "rings") {
        return "mm";
      } else if (
        category.Name.toLowerCase() === "necklaces" ||
        category.Name.toLowerCase() === "bracelets"
      ) {
        return "cm";
      }
    }
    return "";
  };

  return (
    <div>
      <form
        className="bg-gray-100 p-6 rounded-lg shadow-md max-w-7xl mx-auto mb-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-5 text-2xl text-gray-800">
          Step 2: Detailed jewelry
        </h2>

        <Grid container spacing={2} mt={2} mb={2} justifyContent="center">
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <Typography>Material</Typography>
              <Select
                name="materialId"
                value={localData.materialId}
                onChange={handleChange}
                required
              >
                {materials.map((material) => (
                  <MenuItem
                    key={material.MaterialId}
                    value={material.MaterialId}
                  >
                    {material.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Typography>Quantity Material</Typography>
            <TextField
              name="quantityMaterial"
              value={localData.quantityMaterial}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.quantityMaterial}
              helperText={errors.quantityMaterial}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <Typography>Category</Typography>
              <Select
                name="categoryId"
                value={localData.categoryId}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.CategoryId}
                    value={category.CategoryId}
                  >
                    {category.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Typography>
              {`Size (${getSizeUnit(localData.categoryId)})`}
            </Typography>
            <TextField
              name="size"
              value={localData.size}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.size}
              helperText={errors.size}
            />
          </Grid>
        </Grid>

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prevStep}
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

export default Step2;
