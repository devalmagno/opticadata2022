import { useEffect, useState } from "react";

import Header from "../components/Header";
import { AddButton } from "../components/AddButton";
import { ProductTable } from "../components/ProductTable";

import { Product } from "../pages/orders";

import { api } from "../services/api";

import styles from "../styles/products.module.scss";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.container}>
            <Header title="Mercadorias e Produtos"/>

            <section className={styles.main}>
                <AddButton 
                    title="Adicionar Produto"
                />

                <div className={styles.tables}>
                    <ProductTable products={products}/>
                </div>
            </section>
        </div>
    );
}

export default Products;