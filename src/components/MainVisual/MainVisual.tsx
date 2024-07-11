import styles from "./MainVisual.module.scss";
import { Heading } from "../Heading/Heading";

export const MainVisual = () => {
  return (
    <div className={styles.root}>
      <Heading as="h1">
        Hi,I'm Miku.
        <br />I love freedom!
      </Heading>
    </div>
  );
};
