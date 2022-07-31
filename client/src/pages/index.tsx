import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { api } from "../services/api";

import styles from "../styles/login.module.scss";

type Collaborator = {
    col_id: string;
    col_name: string;
    col_cpf: string;
    col_function: string;
}

const Home = () => {
    const cpfRef = useRef<HTMLInputElement>(null);
    const { signIn } = useContext(AuthContext);

    const [isManager, setIsManager] = useState(true);
    const [isCapsLockOn, setIsCapslockOn] = useState(false);
    const [isWord, setIsWord] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleManager = () => {
        setIsManager(!isManager);
    }

    const handleCPFInput = (keyEvent: KeyboardEvent) => {
        if (keyEvent.key != 'Backspace' && keyEvent.key != 'Tab' && keyEvent.key != 'Enter') {
            if (!/\d/.test(keyEvent.key)) {
                setIsWord(true);
                return;
            }

            setIsWord(false);


            if (cpfRef.current?.value.length == 3 || cpfRef.current?.value.length == 7) {
                cpfRef.current.value += ".";
            }

            if (cpfRef.current?.value.length == 11) {
                cpfRef.current.value += "-";
            }
        }
    }

    const handleCapslock = (keyEvent: KeyboardEvent) => {
        if (keyEvent.getModifierState("CapsLock")) setIsCapslockOn(true);
        else setIsCapslockOn(false);
    }

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            await signIn({ cpf, password });
        } catch (err) {
            setIsLoading(false);

            setError(true);
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | ÓpticoData</title>
            </Head>

            <div className={styles.logo}>
                <img src="/logoopticodata.svg" alt="OpticoData" />
            </div>

            <div className={styles.login}>
                <h2>Bem vindo ao ÓpticoData</h2>

                <form onSubmit={handleSignIn}>
                    <div className={`${styles.inputBox} ${styles.cpf}`}>
                        <input
                            ref={cpfRef}
                            type="text"
                            name="cpf"
                            id="cpf"
                            placeholder="CPF"
                            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            autoComplete="off"
                            maxLength={14}
                            onKeyDown={keyEvent => handleCPFInput(keyEvent)}
                            onChange={e => { setCpf(e.target.value) }}
                            required
                        />

                        {
                            isWord &&
                            (
                                <div className={`${styles.warning} ${styles.isword}`}>
                                    <strong>Apenas números são permitidos.</strong>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Senha"
                            maxLength={40}
                            onKeyDown={keyEvent => handleCapslock(keyEvent)}
                            onChange={e => { setPassword(e.target.value) }}
                            required
                        />
                        {
                            isCapsLockOn &&
                            (
                                <div className={`${styles.warning} ${styles.capslock}`}>
                                    <strong>CapsLock ativado</strong>
                                </div>
                            )
                        }

                        {
                            error &&
                            (
                                <div className={`${styles.warning} ${styles.isword}`}>
                                    <strong>CPF ou senha inválida.</strong>
                                </div>
                            )
                        }
                    </div>

                    <div className={`${styles.inputBox} ${styles.button}`}>
                        <input type="submit" value="Entrar" />
                    </div>
                </form>
            </div>

            <div className={styles.footer}>
                Desenvolvido por
                <img src="/logonorteminas.svg" alt="Norte Minas Soluções Digitais" />
            </div>

            <div className={isLoading ? `${styles.bg_modal} ${styles.active}` : styles.bg_modal}>
                <div className={styles.modal_content}>
                    <div className={styles.loader}></div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'opdauth.token': token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
}

export default Home;
