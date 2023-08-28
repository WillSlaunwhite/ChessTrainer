import Typography from "@material-tailwind/react/components/Typography";

const WelcomeMessageComponent: React.FC = () => {
  return (
    <div className="message-container w-3/4 mx-auto">
      <Typography className="welcome-message-text text-center leading-none w-11/12 mx-auto pt-1" variant="h4" color="blue">
        Welcome to the Beta version of <strong>Modern Learning System</strong>
      </Typography>
    </div>
  );
}

export default WelcomeMessageComponent;