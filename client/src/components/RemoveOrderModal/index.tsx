import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { OrderInfo } from "../../pages/orders";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

type Props = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setShowOrderModal: Dispatch<SetStateAction<boolean>>;
    currentOrder: OrderInfo;
    ordersArray: OrderInfo[];
};

const RemoveModal = ({
    showModal,
    setShowModal,
    setShowOrderModal,
    currentOrder,
    ordersArray
}: Props) => {
    const [isButton, setIsButton] = useState(false);

    const { order } = currentOrder;
    
    const handleRemoveOrder = async (e: FormEvent) => {
        e.preventDefault();
        
        const index = ordersArray.indexOf(currentOrder);
        
        api.delete(`/orders/${order.id}`).then(() => {
            ordersArray.splice(index, 1);
            setShowModal(!showModal);
            setShowOrderModal(false);
        }).catch(err => { console.log(err) });
    };

    return (
        <>
            {showModal && (
                <div className={styles.bg_modal}>
                    <div className={styles.content}>
                        <h3>Remover registro de venda</h3>
                        <div className={styles.field}>
                            <span>
                                Tem certeza que deseja remover o registro desta
                                venda?
                            </span>
                        </div>
                        <form onSubmit={handleRemoveOrder}>
                            <div className={styles.radio}>
                                <input
                                    type="checkbox"
                                    name="payment"
                                    id="payment"
                                    onClick={() => {
                                        setIsButton(!isButton);
                                    }}
                                    required
                                />
                                <label htmlFor="payment"></label>
                                <span>
                                    Sim, eu tenho certeza e sei o que estou
                                    fazendo.
                                </span>
                            </div>

                            <div
                                className={
                                    isButton
                                        ? `${styles.buttons} ${styles.active}`
                                        : styles.buttons
                                }
                            >
                                <input
                                    type="submit"
                                    value="Remover"
                                    className={styles.buttonStyle}
                                />
                                <button
                                    onClick={() => {
                                        setShowModal(!showModal);
                                    }}
                                    className={styles.buttonStyle}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default RemoveModal;
