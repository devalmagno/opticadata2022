import Link from "next/link";
import Router from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { destroyCookie } from "nookies";

import { BiGlassesAlt, BiUser, BiLogOut } from "react-icons/bi";
import { IoGrid, IoBag, IoSettings } from "react-icons/io5";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { AiOutlineDropbox } from "react-icons/ai";

import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles.module.scss";
import { api } from "../../services/api";

type Props = {
    children: ReactNode;
};

type Settings = {
    id: string;
    optics_name: string;
    optics_unit: string;
    optics_color: string;
    created_at: Date;
    updated_at: Date;
}

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [sideBar, setSideBar] = useState(false);
    const [settings, setSettings] = useState<Settings>();

    const handleLogOut = () => {
        destroyCookie(null, "opdauth.token");

        Router.push("/");
    };

    useEffect(() => {
        api.get("/settings")
            .then(res => {
                setSettings(res.data[0]);
            })
    }, []);

    return (
        <div
            className={
                !sideBar ? `${styles.sidebar} ${styles.active}` : styles.sidebar
            }
        >
            <div className={styles.logo_content}>
                <div className={styles.logo}>
                    <BiGlassesAlt className={styles.logo_icon} />
                    <div className={styles.logo_name}>ÓpticoData</div>
                </div>
                <div
                    className={styles.menu}
                    onClick={() => {
                        setSideBar(!sideBar);
                    }}
                >
                    <div className={styles.burger}></div>
                    <div className={styles.burger}></div>
                    <div className={styles.burger}></div>
                </div>
            </div>

            {settings &&
            (
                <div className={styles.optics_settings}>
                    <strong>{settings.optics_name}</strong>
                    <span>{settings.optics_unit}</span>
                </div>
            )}
            
            <ul className={styles.nav_list}>
                <li>
                    <Link href="/dashboard">
                        <a>
                            <IoGrid className={styles.icons} />
                            <span className={styles.links_name}>Dashboard</span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>Dashboard</span>
                </li>
                <li>
                    <Link href="/users">
                        <a href="#">
                            <FaUser className={styles.icons} />
                            <span className={styles.links_name}>Usuários</span>
                        </a>
                    </Link>

                    <span className={styles.tooltip}>Usuários</span>
                </li>
                <li>
                    <Link href="/orders">
                        <a>
                            <FaShoppingCart className={styles.icons} />
                            <span className={styles.links_name}>Vendas</span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>Vendas</span>
                </li>
                <li>
                    <a>
                        <AiOutlineDropbox className={styles.icons} />
                        <span className={styles.links_name}>Estoque</span>
                    </a>
                    <span className={styles.tooltip}>Estoque</span>
                </li>
                <li>
                    <a href="#">
                        <IoBag className={styles.icons} />
                        <span className={styles.links_name}>
                            Mercadorias e Produtos
                        </span>
                    </a>
                    <span className={styles.tooltip}>
                        Mercadorias e Produtos
                    </span>
                </li>
                <li>
                    <Link href="/settings">
                        <a>
                            <IoSettings className={styles.icons} />
                            <span className={styles.links_name}>Configurações</span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>Configurações</span>
                </li>
 
            </ul>

            <div className={styles.profile_content}>
                <div className={styles.profile}>
                    <div className={styles.profile_details}>
                        <BiUser className={styles.user} />
                        <div className={styles.name_job}>
                            <div className={styles.name}>{user?.name}</div>
                            <div className={styles.job}>Gerente</div>
                        </div>
                    </div>

                    <BiLogOut
                        className={styles.logout}
                        onClick={handleLogOut}
                    />
                    <span className={styles.tooltip}>Sair</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
