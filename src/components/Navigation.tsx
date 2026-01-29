import styles from "@/styles/navigation.module.css";
import { NavLink } from "react-router-dom";

// import { useTheme } from "@emotion/react";
import BuildIcon from '@mui/icons-material/Build';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function Navigation() {

  const linkStyle = ({ isActive }: any) => isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav className={styles.nav}>
      <NavLink to="/distStats" className={linkStyle}><LocationOnIcon />Distritos</NavLink>
      {/* <Divider /> */}
      <NavLink to="/maintances" className={linkStyle}><BuildIcon />Manutenções</NavLink>
    </nav>
  );
}