import WordOfTheDay from "./WordOfTheDay";
import WordSearch from "./WordSearch";
import Translate from "./Translate";
import { Grid } from "@mui/material";
// import "./styles.css";

function Main() {
  return (
    <Grid container spacing={2} className="main-grid">
      <Grid item xs={3}>
        <WordOfTheDay className="word-of-the-day main-section-item" />
      </Grid>
      <Grid item xs={6}>
        <WordSearch className="word-search main-section-item" />
      </Grid>
      <Grid item xs={3}>
        <Translate className="translate main-section-item" />
      </Grid>
    </Grid>
  );
}

export default Main;
