import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateIngredientCategoryForm from "./CreateIngredientCategory";
import { useEffect, useState } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
  deleteIngredient,
} from "../../State/Admin/Ingredients/Action";
import { getRestaurantById } from "../../State/Customers/Restaurant/restaurant.action";

// Modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Ingredients = () => {
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
  const handleOpenIngredientCategory = () => setOpenIngredientCategory(true);
  const handleCloseIngredientCategory = () => setOpenIngredientCategory(false);

  const [openIngredient, setOpenIngredient] = useState(false);
  const handleOpenIngredient = () => setOpenIngredient(true);
  const handleCloseIngredient = () => setOpenIngredient(false);

  const [activeTab, setActiveTab] = useState("ingredients");

  const handleUpdateStocke = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  // Delete Ingredient
  const handleDeleteIngredient = (id) => {
    console.log("Deleting ingredient with ID:", id);
    dispatch(deleteIngredient(id, jwt))
      .then(() => {
        dispatch(getIngredientsOfRestaurant({ id: restaurant.id, jwt }));
      })
      .catch((error) => {
        alert("Failed to delete ingredient: " + error.message);
        console.error("Failed to delete ingredient:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        width: "100%",
      }}
    >
      {/* Main container with centered content */}
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        {/* Buttons to switch between Ingredients and Category */}
        <Grid container spacing={1} sx={{ marginBottom: 2, justifyContent: "center" }}>
          <Grid item>
            <Button
              variant={activeTab === "ingredients" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={activeTab === "category" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setActiveTab("category")}
            >
              Category
            </Button>
          </Grid>
        </Grid>

        {/* Main content grid for table */}
        <Grid container spacing={1} justifyContent="center">
          {/* Centered Ingredients Table */}
          <Grid item xs={12} lg={8}>
            {activeTab === "ingredients" && (
              <Card className="mt-1">
                <CardHeader
                  title={"Ingredients"}
                  sx={{
                    pt: 2,
                    alignItems: "center",
                    "& .MuiCardHeader-action": { mt: 0.6 },
                  }}
                  action={
                    <IconButton onClick={handleOpenIngredient}>
                      <Create />
                    </IconButton>
                  }
                />
                <TableContainer className="h-[88vh] overflow-y-scroll">
                  <Table aria-label="table in dashboard">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Availability</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.ingredients.map((item) => (
                        <TableRow
                          className="cursor-pointer"
                          hover
                          key={item.id}
                          sx={{
                            "&:last-of-type td, &:last-of-type th": { border: 0 },
                          }}
                        >
                          <TableCell>{item?.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category.name}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleUpdateStocke(item.id)}
                              color={item.inStoke ? "success" : "primary"}
                            >
                              {item.inStoke ? "in stock" : "out of stock"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </Grid>

          {/* Centered Category Table */}
          <Grid item xs={12} lg={8}>
            {activeTab === "category" && (
              <Card className="mt-1">
                <CardHeader
                  title={"Category"}
                  sx={{
                    pt: 2,
                    alignItems: "center",
                    "& .MuiCardHeader-action": { mt: 0.6 },
                  }}
                  action={
                    <IconButton onClick={handleOpenIngredientCategory}>
                      <Create />
                    </IconButton>
                  }
                />
                <TableContainer>
                  <Table aria-label="table in dashboard">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.category?.map((item) => (
                        <TableRow
                          className="cursor-pointer"
                          hover
                          key={item.id}
                          sx={{
                            "&:last-of-type td, &:last-of-type th": { border: 0 },
                          }}
                        >
                          <TableCell>{item?.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Modals for creating Ingredient and Category */}
        <Modal
          open={openIngredient}
          onClose={handleCloseIngredient}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateIngredientForm handleClose={handleCloseIngredient} />
          </Box>
        </Modal>

        <Modal
          open={openIngredientCategory}
          onClose={handleCloseIngredientCategory}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateIngredientCategoryForm handleClose={handleCloseIngredientCategory} />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Ingredients;
