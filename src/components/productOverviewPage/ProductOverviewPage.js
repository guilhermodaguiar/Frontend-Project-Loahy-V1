import React from "react";

function ProductOverviewPage() {
    const products = ['product1','product2', 'products3'];

    return(
        <>
            <div>
                <ul>
                    {products.map((product) => {
                        return <li key={product}>{product}</li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default ProductOverviewPage;
