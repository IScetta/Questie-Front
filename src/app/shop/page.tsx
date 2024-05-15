import Card from "../components/card";

const Shop = () => {
  return (
    <div className="flex mx-[11.5rem] justify-center flex-col my-20 select-none">
      <h3 className="text-5xl text-gray-700 font-bold mb-8 mx-auto text-center">
        Tienda
      </h3>
      <div className="flex w-full justify-center space-x-5 items-center">
        <Card
          title="$5"
          body="Bolsa de 500 monedas"
          buttonLabel="Comprar"
          buttonLink="#"
          imgUrl="https://res.cloudinary.com/dj279fdwd/image/upload/v1715726221/bag-of-coins_pa3ifw.png"
          style={{
            height: "80%",
            boxShadow: "-20px 30px 30px rgba(0, 0, 0, 0.25)",
          }}
        />

        <Card
          title="$20"
          body="Cofre de 2500 monedas"
          buttonLabel="Comprar"
          buttonLink="#"
          imgUrl="https://res.cloudinary.com/dj279fdwd/image/upload/v1715726221/chest-of-coins_hlgn84.png"
          style={{
            height: "90%",
            boxShadow: "0px 30px 30px rgba(0, 0, 0, 0.25)",
          }}
        />

        <Card
          title="$50"
          body="Carreta 8600 monedas"
          buttonLabel="Comprar"
          buttonLink="#"
          imgUrl="https://res.cloudinary.com/dj279fdwd/image/upload/v1715726221/cart-of-coins_vnxbh6.png"
          style={{
            height: "80%",
            boxShadow: "20px 30px 30px rgba(0, 0, 0, 0.25)",
          }}
        />
      </div>
      <p className="mt-20 mx-auto text-center text-gray-600 italic text-xl">
        Compra monedas para desbloquear características especiales en la app.
      </p>
    </div>
  );
};

export default Shop;
