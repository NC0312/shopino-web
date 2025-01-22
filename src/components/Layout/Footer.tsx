"use client";
import React, { FormEvent, useState } from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const socialHover = {
    scale: 1.2,
    rotate: [0, -10, 10, 0],
    transition: { type: "spring", stiffness: 400 },
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white text-primary pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="space-y-4 sm:space-y-6" variants={fadeInUp}>
            <div className="relative inline-block">
              <h3 className="text-lg sm:text-xl font-semibold text-primary tracking-wide">
                About Shopino
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gray-200 w-12"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <p className="text-primary text-sm sm:text-base leading-relaxed font-light max-w-sm">
              Discover curated luxury fashion, timepieces, and accessories.
              Experience premium shopping with worldwide shipping.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="sm:ml-auto lg:ml-0">
            <div className="relative inline-block mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary tracking-wide">
                Quick Links
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gray-200 w-12"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {["New Arrivals", "Best Sellers", "Trending Now", "Sale"].map(
                (item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="transform-gpu"
                  >
                    <a
                      href="#"
                      className="text-primary hover:text-primary text-sm sm:text-base inline-block hover:underline decoration-gray-300 underline-offset-4"
                    >
                      {item}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="relative inline-block mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary tracking-wide">
                Customer Service
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gray-200 w-12"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Contact Us",
                "Shipping Policy",
                "Returns & Exchanges",
                "FAQs",
              ].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="transform-gpu"
                >
                  <a
                    href="#"
                    className="text-primary hover:text-primary text-sm sm:text-base inline-block hover:underline decoration-gray-300 underline-offset-4"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="relative inline-block mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-primary tracking-wide">
                Stay Connected
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gray-200 w-12"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <p className="text-primary text-sm sm:text-base mb-4 sm:mb-6 font-light">
              Subscribe to receive exclusive offers and updates
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md">
              <motion.div
                className="flex flex-col sm:flex-row gap-3 group"
                whileHover={{ scale: 1.01 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-gray-50 text-primary px-4 py-3 rounded-lg text-sm sm:text-base w-full
                           placeholder-gray-500 border border-gray-200 
                           focus:border-gray-400 transition-all duration-300
                           outline-none
                           group-hover:border-gray-300"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg text-sm sm:text-base
                           font-medium hover:bg-primary transition-all duration-300 
                           hover:shadow-lg hover:shadow-gray-200 active:scale-95
                           w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </motion.div>
            </form>
            <AnimatePresence>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 text-sm sm:text-base mt-2"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6 sm:space-x-8 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              className="text-primary hover:text-primary p-2 sm:p-3 relative group"
              whileHover={socialHover}
            >
              <motion.div
                className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <Icon size={20} className="sm:w-6 sm:h-6" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-gray-200 pt-6 sm:pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm sm:text-base text-primary">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 items-center">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-primary transition-colors relative group"
                  whileHover={{ x: 3 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-px bg-gray-900 w-0 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.a>
              ))}
            </div>
            <p className="font-light text-center sm:text-left">
              &copy; {new Date().getFullYear()} Shopino. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
