import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Bienvenido a Miten Comercio</h1>
            <p className="py-6">
              Nos especializamos en ofrecer productos digitales 3C de alta
              calidad para satisfacer sus necesidades tecnológicas.
            </p>
            <Link
              to="/product"
              className="btn btn-primary"
            >
              Ver nuestros productos
            </Link>
          </div>
        </div>
      </div>

      {/* Product Categories Section */}
      {/* <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Tipos de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b49d.jpg" alt="Electronics" /></figure>
            <div className="card-body">
              <h2 className="card-title">Productos Electrónicos</h2>
              <p>Desde teléfonos inteligentes hasta computadoras portátiles, ofrecemos los últimos dispositivos electrónicos.</p>
              <div className="card-actions justify-end">
                <Link to="/products?category=electronics" className="btn btn-primary">Ver detalles</Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b49d.jpg" alt="Accessories" /></figure>
            <div className="card-body">
              <h2 className="card-title">Accesorios</h2>
              <p>Auriculares, cargadores, fundas protectoras y más para mejorar su experiencia de usuario.</p>
              <div className="card-actions justify-end">
                <Link to="/products?category=accessories" className="btn btn-primary">Ver detalles</Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b49d.jpg" alt="Peripherals" /></figure>
            <div className="card-body">
              <h2 className="card-title">Periféricos</h2>
              <p>Teclados, ratones, monitores y más para crear su estación de trabajo ideal.</p>
              <div className="card-actions justify-end">
                <Link to="/products?category=peripherals" className="btn btn-primary">Ver detalles</Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
