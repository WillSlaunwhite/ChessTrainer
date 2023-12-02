type ExplanationProps = {
  explanation: string;
}

const ExplanationComponent: React.FC<ExplanationProps> = ({
  explanation
}) => {
  return (
    <p className="explanation-text">{explanation}</p>
  );
};

export default ExplanationComponent;