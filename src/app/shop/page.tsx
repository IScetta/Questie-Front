import { getAllProducts } from "@/helpers/products.helper";
import Card from "../components/card";
import { IProduct } from "../types";

const Shop = async () => {
  //GET ALL PRODUCTS FROM API
  const products = await getAllProducts();

  console.log(products);

  //SORT PRODUCTS BY ORDER
  products.sort((a: IProduct, b: IProduct) => a.order - b.order);

  //MAP PRODUCTS TO CARDS
  const productsList = products.map((product: IProduct, index: number) => (
    <Card
      key={index}
      title={product.name}
      // body={product.description}
      buttonLabel="Comprar"
      buttonLink={`/shop/pay?productId=${product.id}`}
      imgUrl={product.imgUrl}
      style={{
        height: "80%",
        boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.25)",
        maxHeight: "80%",
        flex: "1",
      }}
    />
  ));

  return (
    <div className="flex mx-[11.5rem] justify-center flex-col my-20 select-none">
      <h3 className="text-5xl text-gray-700 font-bold mb-8 mx-auto text-center">
        Tienda
      </h3>
      <div className="flex w-full justify-center space-x-5 items-center h-[calc(100vh - 5rem)]">
        {productsList}
      </div>
      <p className="mt-20 mx-auto text-center text-gray-600 italic text-xl">
        Compra monedas para desbloquear características especiales en la app.
      </p>
    </div>
  );
};

export default Shop;
