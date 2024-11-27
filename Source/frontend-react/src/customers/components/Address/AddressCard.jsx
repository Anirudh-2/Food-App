import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

const AddressCard = ({ handleSelectAddress, item, showButton }) => {
  // Check if item exists and has the necessary properties before rendering
  if (!item) {
    return <div>No address provided</div>; // A fallback UI in case 'item' is undefined or null
  }

  return (
    <Card className="flex space-x-5 w-64 p-5">
      <HomeIcon />

      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>
          {/* Safely accessing properties, use optional chaining to avoid errors */}
          {item.streetAddress}, {item.postalCode}, {item.state}, {item.country}
        </p>

        {showButton && (
          <Button
            onClick={() => handleSelectAddress(item)} // Trigger the address selection
            variant="outlined"
            className="w-full"
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
