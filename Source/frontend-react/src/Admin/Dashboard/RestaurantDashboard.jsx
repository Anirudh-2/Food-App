import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMenuItemsByRestaurantId } from "../../State/Customers/Menu/menu.action";
import { Grid, Button, Box } from "@mui/material";
import OrdersTable from "../Orders/OrderTable";
import MenuItemTable from "../Food/MenuItemTable";
import AvgCard from "../ReportCard/ReportCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const RestaurantDashboard = () => {
  const { id } = useParams();
  const { restaurant } = useSelector((store) => store);
  console.log("restaurants id ", id);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("Recent Order"); // state to track which tab is active

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, id]);

  console.log("restaurant", restaurant);

  return (
    <div className="px-2">
      <Box sx={{ mb: 2 }}>
        {/* Buttons to toggle between the two tables */}
        <Button
          variant={activeTab === "Recent Order" ? "contained" : "outlined"}
          onClick={() => setActiveTab("Recent Order")}
          sx={{ marginRight: 2 }}
        >
          Recent Order
        </Button>
        <Button
          variant={activeTab === "Recently Added Menu" ? "contained" : "outlined"}
          onClick={() => setActiveTab("Recently Added Menu")}
        >
          Recently Added Menu
        </Button>
      </Box>

      <Grid container spacing={1}>
        {/* Show the Recent Order table if activeTab is 'Recent Order' */}
        {activeTab === "Recent Order" && (
          <Grid lg={12} xs={12} item>
            <OrdersTable name={"Recent Order"} isDashboard={true} />
          </Grid>
        )}

        {/* Show the Recently Added Menu table if activeTab is 'Recently Added Menu' */}
        {activeTab === "Recently Added Menu" && (
          <Grid lg={12} xs={12} item>
            <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default RestaurantDashboard;
