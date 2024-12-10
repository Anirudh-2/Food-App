import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../State/Customers/Restaurant/restaurant.action";

const EventCard = ({ item, isCustomer }) => {
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // Check if item is valid before using it
  if (!item) {
    return null; // You can show a loading spinner or return null in case of invalid data.
  }

  const handleDeleteEvent = () => {
    // Dispatch the delete action with the event ID
    dispatch(deleteEventAction(item.id));
    setOpenSnackBar(true); // Show Snackbar after deleting event
  };

  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{
            height: 345,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.5s ease-in-out",
            },
          }}
          image={item.image || "/default-image.jpg"}  // fallback image if none provided
          title={item.name || "Event Image"}  // fallback title
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.restaurant?.name || "Restaurant Name"} {/* Fallback restaurant name */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.name || "Event Name"}  {/* Fallback event name */}
          </Typography>
          <div className="py-2 space-y-2">
            <p>{item.location || "Location not provided"}</p>  {/* Fallback for location */}
            <p className="text-sm text-blue-500">{item.startedAt || "Start Date Not Available"}</p>
            <p className="text-sm text-red-500">{item.endsAt || "End Date Not Available"}</p>
          </div>
        </CardContent>
        
        {/* Render delete button if not a customer */}
        {!isCustomer && (
          <CardActions>
            <IconButton onClick={handleDeleteEvent} aria-label="delete event">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>

      {/* Snackbar to show success message */}
      <Snackbar
        sx={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "blue",
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Event Deleted Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EventCard;
