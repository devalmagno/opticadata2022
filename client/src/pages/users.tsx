import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { BiEdit } from "react-icons/bi";

import Header from "../components/Header";
import RemoveCollaboratorModal from "../components/RemoveCollaboratorModal";
import CollaboratorForm from "../components/CollaboratorForm";
import EditOccupation from "../components/EditOccupation";
import Loading from "../components/Loading";

import { useFetch } from "../hooks/useFetch";

import styles from "../styles/users.module.scss";
import { useEffect, useState } from "react";

type Occupation = {
    id: string;
    name: string;
};

type UserType = {
    user_col_id: string;
}

export type Collaborator = {
    col_id: string;
    col_name: string;
    col_cpf: string;
    col_function: string;
    isUser?: boolean;
    created_at: Date;
    updated_at: Date;
}

const Users = () => {
    const [showCreateCollaboratorModal, setShowCreateCollaboratorModal] = useState(false);
    const [showRemoveCollaboratorModal, setRemoveCollaboratorModal] = useState(false);
    const [currentCollaborator, setCurrentCollaborator] = useState<Collaborator>();
    const [currentIndex, setCurrentIndex] = useState(0);

    const [showEditOccupation, setShowEditOccupation] = useState(false);

    const { data: collaborators } = useFetch<Collaborator[]>("/collaborators");
    const { data: users } = useFetch<UserType[]>("/users");
    if (!collaborators || !users) return <Loading />

    collaborators.forEach(col => {
        users.forEach(user => {
            if (col.col_id == user.user_col_id) col.isUser = true;
        });
    });

    if (!showRemoveCollaboratorModal) document.body.style.overflow = "unset";
    if (!showCreateCollaboratorModal) document.body.style.overflow = "unset";

    const handleRemoveCollaborator = (collaborator: Collaborator, index: number) => {
        setCurrentCollaborator(collaborator);
        setCurrentIndex(index);
        setRemoveCollaboratorModal(!showRemoveCollaboratorModal);
    };

    const handleEditOccupation = (collaborator: Collaborator) => {
        setCurrentCollaborator(collaborator);
        setShowEditOccupation(!showEditOccupation);
    };

    return (
        <div className={styles.container}>
            <Header title="Usuários" />
            <div className={styles.users}>
                <section className={styles.workers}>
                    <h3>Funcionários</h3>

                    <div className={styles.button}>
                        <button
                            onClick={() => {
                                setShowCreateCollaboratorModal(
                                    !showCreateCollaboratorModal
                                );
                            }}
                        >
                            Adicionar Colaborator
                        </button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Usuário</th>
                                <th>Vendas</th>
                                <th>
                                    Cargo <BiEdit color="#110425" />
                                </th>
                                <th>Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collaborators.map((collaborator, index) => (
                                <tr key={collaborator.col_id}>
                                    <td>{collaborator.col_name}</td>
                                    <td>{collaborator.col_cpf}</td>
                                    <td>{collaborator.isUser ? 'Sim' : 'Não'}</td>
                                    <td>0</td>
                                    {/* <td>{worker.sales}</td> */}
                                    <td
                                        onClick={() => {
                                            handleEditOccupation(collaborator);
                                        }}
                                    >
                                        <div className={styles.tooltip}>
                                            <span>Editar</span>
                                        </div>
                                    </td>
                                    <td
                                        onClick={() => {
                                            handleRemoveCollaborator(collaborator, index);
                                        }}
                                    >
                                        <div className={styles.box_close}>
                                            <div className={styles.close}></div>
                                            <div className={styles.close}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </div>

            {showRemoveCollaboratorModal ? (
                <RemoveCollaboratorModal
                    showModal={showRemoveCollaboratorModal}
                    setShowModal={setRemoveCollaboratorModal}
                    collaborator={currentCollaborator!}
                    index={currentIndex}
                    collaborators={collaborators}
                />
            ) : (
                ""
            )}

            {showCreateCollaboratorModal ? (
                <CollaboratorForm
                    showModal={showCreateCollaboratorModal}
                    setShowModal={setShowCreateCollaboratorModal}
                    collaborators={collaborators}
                />
            ) : undefined}
           
            {/* {showEditOccupation ? (
                <EditOccupation
                    showModal={showEditOccupation}
                    setShowModal={setShowEditOccupation}
                    worker={currentCollaborator}
                />
            ) : undefined} */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "opdauth.token": token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default Users;
