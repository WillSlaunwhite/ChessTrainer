import { Typography } from "@material-tailwind/react/components/Typography";
import React from "react";

const Header: React.FC = () => {
	return (
      <Typography className="text-center leading-none w-9/12 mx-auto py-3 scale-110" variant="h2" color="indigo">
        Welcome to <strong>Chess Trainer</strong>
      </Typography>
	);
};

export default Header;
