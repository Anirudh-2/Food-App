import React from 'react';
import PropTypes from 'prop-types';

const CarouselItem = ({ image, title, restaurantId, onClick }) => {
  return (
    <div
      className='flex flex-col justify-center items-center cursor-pointer'
      onClick={() => onClick(restaurantId)} // Call onClick with restaurantId when clicked
    >
      <img
        className='w-[10rem] h-[10rem] lg:w-[14rem] lg:h-[14rem] rounded-full object-cover object-center'
        src={image}
        alt={title}
      />
      <span className='py-5 font-semibold text-xl text-gray-400'>{title}</span>
    </div>
  );
};

// Define prop types to ensure correct usage
CarouselItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired, // Restaurant ID to navigate to
  onClick: PropTypes.func.isRequired, // onClick function to handle navigation
};

export default CarouselItem;
