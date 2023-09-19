import { Typography } from "@material-tailwind/react/components/Typography";
import React from "react";

const Header: React.FC = () => {
	return (
      <Typography className="welcome-message-text text-center leading-none w-11/12 mx-auto pt-1" variant="h4" color="blue">
        Welcome to the Beta version of <strong>Modern Learning System</strong>
      </Typography>
	);
};

export default Header;
