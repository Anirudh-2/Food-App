import {
  Avatar,
  AvatarGroup,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  CircularProgress,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../State/Admin/Order/restaurants.order.action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Ready For Pickup", value: "Ready For Pickup" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrdersTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const { id } = useParams();

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateOrder = (orderId, orderStatus, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{}} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell> {/* Added Date column */}
                {!isDashboard && <TableCell>Status</TableCell>}
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantsOrder.orders
                ?.slice(0, isDashboard ? 7 : restaurantsOrder.orders.length)
                .map((item, index) => (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    key={item.id}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell>{item?.id}</TableCell>
                    <TableCell sx={{}}>
                      <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                        {item.items.map((orderItem) => (
                          <Avatar
                            alt={orderItem.food.name}
                            src={orderItem.food?.images[0]}
                          />
                        ))}
                      </AvatarGroup>{" "}
                    </TableCell>

                    <TableCell sx={{}}>{item?.customer.email}</TableCell>

                    <TableCell>₹{item?.totalAmount}</TableCell>

                    <TableCell className="">
                      {item.items.map((orderItem) => (
                        <p key={orderItem.food.id}>{orderItem.food?.name}</p>
                      ))}
                    </TableCell>

                    {/* Date Column */}
                    <TableCell>
                      {new Date(item?.createdAt).toLocaleDateString()} {/* Assuming createdAt exists */}
                    </TableCell>

                    {!isDashboard && (
                      <TableCell className="text-white">
                        <Chip
                          sx={{
                            color: "white !important",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                          label={item?.orderStatus}
                          size="small"
                          color={
                            item.orderStatus === "PENDING"
                              ? "info"
                              : item?.orderStatus === "DELIVERED"
                              ? "success"
                              : "secondary"
                          }
                          className="text-white"
                        />
                      </TableCell>
                    )}

                    {!isDashboard && (
                      <TableCell sx={{ textAlign: "center" }} className="text-white">
                        <div>
                          <Button
                            id={`basic-button-${item?.id}`}
                            aria-controls={`basic-menu-${item.id}`}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElArray[index])}
                            onClick={(event) =>
                              handleUpdateStatusMenuClick(event, index)
                            }
                          >
                            Status
                          </Button>
                          <Menu
                            id={`basic-menu-${item?.id}`}
                            anchorEl={anchorElArray[index]}
                            open={Boolean(anchorElArray[index])}
                            onClose={() => handleUpdateStatusMenuClose(index)}
                            MenuListProps={{
                              "aria-labelledby": `basic-button-${item.id}`,
                            }}
                          >
                            {orderStatus.map((s) => (
                              <MenuItem
                                key={s.value}
                                onClick={() =>
                                  handleUpdateOrder(item.id, s.value, index)
                                }
                              >
                                {s.label}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={restaurantsOrder.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default OrdersTable;
