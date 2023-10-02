import styles from "./Social.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

export const Social = () => {
  return (
    <div className={styles.root}>
      <a
        href="https://www.twitter.com/miku__daifuku"
        target="_blank"
        aria-label="twitter"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        href="https://www.github.com/miku-shio"
        target="_blank"
        aria-label="Github"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
};
