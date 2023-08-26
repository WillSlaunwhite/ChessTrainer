import MoveBlock from "./move-block";

const MoveContainer: React.FC = () => {
  return (
    <div className="block-container flex flex-row mb-8">
      <MoveBlock></MoveBlock>
      <MoveBlock></MoveBlock>
      <MoveBlock></MoveBlock>
    </div>
  );
}

export default MoveContainer;