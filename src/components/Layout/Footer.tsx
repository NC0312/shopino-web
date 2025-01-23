"use client";
import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, Shield, Gift } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const socialHover = {
    scale: 1.15,
    rotate: [0, -8, 8, 0],
    transition: { type: "spring", stiffness: 500, damping: 10 },
  };

  const footerLinks = {
    QuickLinks: [
      "New Arrivals",
      "Best Sellers",
      "Trending Now",
      "Sale",
      "Gift Cards",
      "Collections",
      "Lookbook",
    ],
    CustomerService: [
      "Contact Us",
      "Shipping Policy",
      "Returns & Exchanges",
      "FAQs",
      "Track Order",
      "Size Guide",
      "Product Care",
    ],
    Company: [
      "About Us",
      "Careers",
      "Press",
      "Sustainability",
      "Affiliates",
      "Partners",
      "Blog",
    ],
  };

  const contactInfo = [
    { icon: MapPin, text: "123 Fashion Street, NY 10001", href: "#" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    {
      icon: Mail,
      text: "support@shopino.com",
      href: "mailto:support@shopino.com",
    },
    { icon: Clock, text: "Mon-Fri: 9AM - 6PM EST", href: "#" },
  ];

  const paymentMethods = [
    "visa.svg",
    "mastercard.svg",
    "amex.svg",
    "paypal.svg",
    "apple-pay.svg",
    "google-pay.svg",
  ];

  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-primary text-white relative">
      {/* Top Features Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure Shopping",
                desc: "100% Protected Transactions",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Dedicated Customer Service",
              },
              {
                icon: Gift,
                title: "Luxury Packaging",
                desc: "Free Gift Wrapping",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center space-x-4 justify-center md:justify-start"
              >
                <feature.icon className="w-6 h-6 text-gray-200" />
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-gray-300">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12">
        <motion.div
          className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 mb-16"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* About Section */}
            <motion.div className="space-y-6 lg:col-span-2" variants={fadeInUp}>
              <div className="relative inline-block">
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  About Shopino
                </h3>
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-gray-200 to-transparent w-16"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
              <p className="text-gray-100 text-base leading-relaxed font-light">
                Discover curated luxury fashion, timepieces, and accessories.
                Experience premium shopping with worldwide shipping and
                exceptional service.
              </p>

              {/* Contact Information */}
              <div className="space-y-4 mt-8">
                {contactInfo.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 3 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links Sections */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <motion.div key={section} variants={fadeInUp}>
                <div className="relative inline-block mb-6">
                  <h3 className="text-xl font-semibold text-white tracking-wide">
                    {section.split(/(?=[A-Z])/).join(" ")}
                  </h3>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-gray-200 to-transparent w-16"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
                <ul className="space-y-3">
                  {links.map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 5 }}
                      className="transform-gpu"
                    >
                      <a
                        href="#"
                        className="text-gray-100 hover:text-white text-sm inline-block hover:underline decoration-gray-300 underline-offset-4 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex flex-col items-center space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-medium">Follow Us</h4>
            <div className="flex justify-center flex-wrap space-x-6">
              {[
                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
                FaPinterest,
                FaYoutube,
              ].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-white hover:text-white p-3 relative group"
                  whileHover={socialHover}
                  aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full -z-10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                  <Icon size={22} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-white/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col space-y-6">
              {/* Payment Methods */}
              <div className="flex flex-wrap justify-center gap-4">
                {paymentMethods.map((method, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-8 bg-white/10 rounded-md flex items-center justify-center"
                  >
                    <Image
                      src={`/${method}`}
                      alt={method.split(".")[0]}
                      width={32}
                      height={20}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>

              {/* Links and Copyright */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-gray-100">
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    "Privacy Policy",
                    "Terms of Service",
                    "Cookie Policy",
                    "Accessibility",
                    "Modern Slavery Statement",
                  ].map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="hover:text-white transition-colors relative group"
                      whileHover={{ x: 3 }}
                    >
                      {item}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-px bg-white w-0 group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </motion.a>
                  ))}
                </div>
                <p className="font-light text-center sm:text-left">
                  &copy; {new Date().getFullYear()} Shopino. All rights
                  reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
