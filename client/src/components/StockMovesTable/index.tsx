import { StockMoves } from "../../pages/stocks";

import styles from "./styles.module.scss";

type Props = {
    stockMoves: StockMoves[];
}

export const StockMovesTable = ({ stockMoves }: Props) => {

    const formatDate = (date: Date) => {
        console.log(date);

        return 'oi';
    }

    return (
       <div className={styles.table_wrapper}>
            <h3>Movimentações de Estoque</h3>        

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Código do Estoque
                        </th>
                        <th>
                            Descrição do Prod.
                        </th>
                        <th>
                            Fornecedor
                        </th>
                        <th>
                            Tipo Mov.
                        </th>
                        <th>
                            Desc.
                        </th>
                        <th>
                            Quant.
                        </th>
                        <th>
                            Valor p/ Unid.
                        </th>
                        <th>
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stockMoves.map(smo => (
                        <tr key={smo.smo_id}>
                            <td>
                                {smo.smo_sto_id}
                            </td>
                            <td>
                                {smo.product?.pro_desc}
                            </td>
                            <td>
                                {smo.smo_prov_id}
                            </td>
                            <td>
                                {smo.smo_type == 'E'
                                    ? "Entrada" 
                                    : "Saída"
                                }
                            </td>
                            <td>
                                {smo.smo_desc}
                            </td>
                            <td>
                                {smo.smo_quantity}
                            </td>
                            <td>
                                {smo.smo_quantity}
                            </td>
                            <td>
                                {
                                    formatDate(smo.created_at)
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}