import { Typography } from "@material-tailwind/react/components/Typography";
import React from "react";

const Header: React.FC = () => {
	return (
      <Typography className="text-center text-transparent bg-clip-text leading-none w-7/12 mx-auto py-3 bg-gradient-to-br from-blue-600 to-red-400" variant="h2">
        Welcome to <strong>Chess Trainer</strong>
      </Typography>
	);
};

export default Header;
