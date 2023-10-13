import styles from "./GlobalNavi.module.scss";
import { Social } from "../Social/Social";
import { useBodyFixed } from "../../hooks/useBodyFixed";
import { useState } from "react";
import clsx from "clsx";
import { useWindowSize } from "../../hooks/useWindowSize";
import { breakpoints } from "../../config/config";

type Navi = { name: string; href: string }[];
const naviList: Navi = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Skill",
    href: "#skill",
  },
  {
    name: "Production",
    href: "#production",
  },
];

export const GlobalNavi = () => {
  const { bodyFixed, setBodyFixed } = useBodyFixed();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [width] = useWindowSize();

  const clickHandle = () => {
    setExpanded(!expanded);
    setBodyFixed(!bodyFixed);
  };

  if (breakpoints.md <= width && expanded) {
    setExpanded(!expanded);
    setBodyFixed(!bodyFixed);
  }

  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-controls="globalNavi"
        aria-expanded={expanded}
        onClick={() => clickHandle()}
      >
        <span className={styles.button__icon}>
          <span className="screenReaderText">メニューを開閉</span>
        </span>
        <span className={styles.button__text}>menu</span>
      </button>

      <nav
        id="globalNavi"
        className={clsx(styles.root, expanded && styles.isOpen)}
      >
        <h2 className="screenReaderText">サイト内メニュー</h2>
        <ul className={styles.list}>
          {naviList.map((item) => (
            <li key={item.name} className={styles.item}>
              <a
                href={item.href}
                className={styles.link}
                onClick={() => width < breakpoints.md && clickHandle()}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className={styles.contact}
          onClick={() => width < breakpoints.md && clickHandle()}
        >
          Contact
        </a>
        <div className={styles.social}>
          <Social />
        </div>
      </nav>
    </>
  );
};
