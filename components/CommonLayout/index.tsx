import Sidebar from "../Sidebar";
import styles from "./CommonLayout.module.css";
const CommonLayout = ({ children }: any) => {
  return (
    <div className={`${styles.main} container-95 d-flex`}>
      <div className={styles.sidebarBox}>
        <Sidebar />
      </div>
      {children}
    </div>
  );
};

export default CommonLayout;
