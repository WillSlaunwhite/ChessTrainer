import Typography from "@material-tailwind/react/components/Typography";

const WelcomeMessageComponent: React.FC = () => {
  return (
    <div className="message-container">
      <Typography className="welcome-message-text text-center leading-8 py-1" variant="h2" color="blue" textGradient>
        Welcome to the Beta version of <strong>Modern Learning System</strong>
      </Typography>
    </div>
  );
}

export default WelcomeMessageComponent;