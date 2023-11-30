import Header from "./Header";
import Rules from "./Rules";

const WelcomeMessageComponent: React.FC = () => {
  return (
    <div className="w-full flex justify-center flex-col mx-auto">
      <Header></Header>
      <Rules></Rules>
    </div>
  );
}

export default WelcomeMessageComponent;