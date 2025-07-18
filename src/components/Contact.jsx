import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { Navbar } from "./Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />

      {/* Map */}
      <section className="my-6 container mx-auto">
        <h1 className="text-white text-2xl font-bold swatson bg-[#1F1E17] inline py-3 px-2 mb-10 rounded">
          Find Us
        </h1>
        <div className="aspect-[16/6] w-full rounded-lg overflow-hidden shadow-lg mt-4">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0409378830473!2d-0.17436122603075627!3d5.560951033602017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9117c1a3e0e7%3A0x6040bd0138187e45!2sburo.!5e0!3m2!1sen!2sgh!4v1752200826126!5m2!1sen!2sgh"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GECA Location"
          />
        </div>
      </section>

      {/* Contact Info & Form */}
      <section
        className="container mx-auto bg-white rounded-xl p-8 shadow-lg mb-12"
        id="contact"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p>
              Reach out today… We're here to support your project every step of
              the way!
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-600" />
                <p>ebe_farms@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-600" />
                <p>+233 (0)598 551 301</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-600 mt-1" />
                <p>
                  3rd Floor Marble,
                  <br />
                  Greater Accra, <br /> Ghana
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-3"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg p-3"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border rounded-lg p-3 h-32"
              />
              <button
                type="submit"
                className="w-full bg-[#1F1E17] cursor-pointer hover:bg-green-500 text-white py-3 rounded-lg font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
