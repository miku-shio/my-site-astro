import styles from "./GlobalNavi.module.scss";
import { Social } from "../Social/Social";
import { useBodyFixed } from "../../hooks/useBodyFixed";
import { useState } from "react";
import clsx from "clsx";

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
];

export const GlobalNavi = () => {
  const { bodyFixed, setBodyFixed } = useBodyFixed();
  const [expanded, setExpanded] = useState<boolean>(false);

  const clickHandle = () => {
    setExpanded(!expanded);
    setBodyFixed(!bodyFixed);
  };

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
              <a href={item.href} className={styles.link}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={styles.contact}>
          Contact
        </a>
        <div className={styles.social}>
          <Social />
        </div>
      </nav>
    </>
  );
};