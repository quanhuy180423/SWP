import React, { useState, useEffect } from "react";
import { getAllGem, getAllMaterial, getAllCategories } from "../server/api";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Step3 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [localData, setLocalData] = useState({
    materialId: formData.materialId || "",
    quantityMaterial: formData.quantityMaterial || 0,
    categoryId: formData.categoryId || "",
    size: formData.size || 0,
  });

  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gemIdError, setGemIdError] = useState("");

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
          Step 3: Chi tiết trang sức
        </h2>

        <Grid container spacing={2} mt={2} mb={2} justifyContent="center">
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Material</InputLabel>
              <Select
                name="materialId"
                value={localData.materialId}
                onChange={handleChange}
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
            <TextField
              label="Trọng lượng (Chỉ)"
              name="quantityMaterial"
              value={localData.quantityMaterial}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={localData.categoryId}
                onChange={handleChange}
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
            <TextField
              label="Size (Ni)"
              name="size"
              value={localData.size}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
            />
          </Grid>
        </Grid>

        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prevStep}
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
