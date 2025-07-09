import React from "react";
import Navbar from "../components/Navbar";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import landpic2 from "../assets/landpic2.jpeg";
import { TrendingUp, Package, Leaf, DollarSign } from "lucide-react";
import green from "../assets/green.jpeg";
import plant from "../assets/plant.jpeg";
import grain from "../assets/grain.jpeg";
import fruits from "../assets/fruits.jpeg";
import sustain from "../assets/sustain.jpeg";
import tech from "../assets/tech.jpeg";
import farmpic from "../assets/farmpic.jpeg";
import farmpic1 from "../assets/farmpic.jpeg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-19">
        <section className="">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={0}
            className="w-full mt-0  h-[100vh] relative"
          >
            <SwiperSlide className="w-screen h-[70vh] bg-[url('./assets/landpic2.jpeg')] bg-no-repeat bg-cover bg-center flex items-center justify-center"></SwiperSlide>

            <SwiperSlide className="w-screen h-[70vh] bg-[url('./assets/farmpic.jpeg')] bg-no-repeat bg-cover bg-center flex items-center justify-center"></SwiperSlide>

            <SwiperSlide className="w-screen h-[70vh] bg-[url('./assets/landpic1.jpeg')] bg-no-repeat bg-cover bg-center flex items-center justify-center"></SwiperSlide>

            <SwiperSlide className="w-screen h-[50vh] bg-[url('./assets/farmpic1.jpeg')] bg-no-repeat bg-cover bg-center flex items-center justify-center"></SwiperSlide>
          </Swiper>
        </section>
        <section className="py-20 bg-gradient-to-br from-yellow-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Our Sustainable Farms
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Explore our network of certified organic farms where your
                investments grow and premium produce is cultivated using
                sustainable practices.
              </p>
            </div>

            {/* Main Featured Farm Image */}
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={green}
                  alt="Expansive organic farm fields"
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Valley Green Farms
                  </h3>
                  <p className="text-lg opacity-90">
                    1,200 acres of certified organic farmland
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-yellow-400" />
                      <span className="text-sm">18% ROI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-yellow-400" />
                      <span className="text-sm">Bulk Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={fruits}
                  alt="Fresh organic vegetables"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-bold">Organic Vegetables</h4>
                  <p className="text-sm">Fresh daily harvest</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={plant}
                  alt="Organic fruit orchards"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-bold">Fruit Orchards</h4>
                  <p className="text-sm">Tree-ripened perfection</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={grain}
                  alt="Golden wheat fields"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-bold">Grain Fields</h4>
                  <p className="text-sm">Premium organic grains</p>
                </div>
              </div>
            </div>

            {/* Farm Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={sustain}
                  alt="Sustainable farming practices"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    Sustainable Practices
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    Our farms use regenerative agriculture techniques that
                    improve soil health and increase biodiversity while
                    maximizing yields.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Carbon Negative Farming</span>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={tech}
                  alt="Modern farming technology"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Smart Agriculture</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Advanced monitoring systems and precision farming techniques
                    ensure optimal growing conditions and maximum investment
                    returns.
                  </p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Data-Driven Results</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Ready to Join Our Farming Community?
                </h3>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                  Whether you're looking to invest in sustainable agriculture or
                  purchase premium organic produce in bulk, we have the perfect
                  solution for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-bold flex items-center justify-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Explore Investment Plans</span>
                  </button>
                  <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors font-bold flex items-center justify-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Browse Bulk Products</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
