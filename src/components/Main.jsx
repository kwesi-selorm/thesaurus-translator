import LearnANewWord from "./LearnANewWord";
import WordSearch from "./WordSearch";
import Translate from "./Translate";

function Main() {
  return (
    <div className="main-grid">
      <div className="main-grid-item">
        <LearnANewWord className="main-grid-item-title" />
      </div>
      <div className="main-grid-item">
        <WordSearch className="main-grid-item-title" />
      </div>
      <div className="main-grid-item">
        <Translate className="main-grid-item-title" />
      </div>
    </div>
  );
}

export default Main;
