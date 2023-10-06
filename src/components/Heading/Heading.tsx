import styles from "./Heading.module.scss";
import clsx from "clsx";

type Props = {
  as?: React.ElementType;
  center?: boolean;
  children: React.ReactNode;
};

export const Heading = ({
  as: CunstomTag = "h2",
  center = false,
  children,
}: Props) => {
  return (
    <CunstomTag className={clsx(styles.root, center && styles.center)}>
      {children}
    </CunstomTag>
  );
};
