"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Clock,
  CheckCircle,
  Sparkles,
  Check,
  Send,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const lastScrollY = useRef(0);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Trending products data
  const trendingProducts = [
    {
      id: 1,
      name: "Premium Leather Bag",
      price: 299.99,
      category: "accessories",
      rating: 4.8,
      image: "/product1.jpg",
      badge: "New Arrival",
    },
    {
      id: 2,
      name: "Designer Watch",
      price: 599.99,
      category: "accessories",
      rating: 4.9,
      image: "/product2.jpg",
      badge: "Trending",
    },
    // Add more products...
  ];

  // New Arrivals data
  // const newArrivals = [
  //   {
  //     id: 1,
  //     name: "Italian Suit Collection",
  //     description: "Handcrafted in Milan",
  //     image: "/arrival1.jpg",
  //     price: 1299.99,
  //   },
  //   // Add more arrivals...
  // ];

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = (): void => {
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsSubmitted(true);
      setIsValid(true);

      // Start exit animation after 2.5 seconds
      setTimeout(() => {
        setIsExiting(true);
      }, 2500);

      // Reset states after exit animation
      setTimeout(() => {
        setIsSubmitted(false);
        setIsExiting(false);
        setEmail("");
      }, 3000);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-[#1D2564] text-white py-2 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-4 text-sm"
          >
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time Offer
            </span>
            <span className="hidden md:inline">|</span>
            <span>Free Shipping on Orders Over Rs.899</span>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="relative h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/hero-luxury.webp"
            alt="Luxury Fashion"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="max-w-3xl mx-auto text-center text-white"
            >
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-light mb-6"
              >
                Redefine Your Style
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl md:text-2xl mb-8 font-light"
              >
                Discover curated luxury fashion for the discerning individual
              </motion.p>
              <motion.div variants={fadeIn} className="space-x-4">
                <Link
                  href="/collections/new"
                  className="inline-flex items-center bg-white text-[#1D2564] px-8 py-4 rounded-none hover:bg-[#1D2564] hover:text-white transition-all duration-300 border border-white"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-light text-gray-900 mb-4"
            >
              Curated Collections
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Explore our handpicked selection of premium fashion pieces
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Men's Hub", slug: "Men" },
              { name: "Women's Wardrobe", slug: "Women" },
              { name: "Kids' Corner", slug: "Kids" }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="relative h-[500px] overflow-hidden">
                  <Image
                    src={`/${category.slug.toLowerCase()}-cover.jpg`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-light mb-4">{category.name}</h3>
                      <Link
                        href={`/category/${category.slug.toLowerCase()}`}
                        className="inline-block border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300"
                      >
                        Discover
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-light text-gray-900 mb-4"
            >
              Trending Now
            </motion.h2>
            <motion.div variants={fadeIn} className="flex justify-center mb-12">
              {["all", "clothing", "accessories", "shoes"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 text-sm transition-colors duration-300 ${activeCategory === category
                    ? "bg-[#1D2564] text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative mb-4">
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    {product.badge && (
                      <span className="inline-block bg-white px-3 py-1 text-sm text-[#1D2564]">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute right-4 top-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white rounded-full hover:bg-[#1D2564] hover:text-white transition-colors duration-300">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-[#1D2564] hover:text-white transition-colors duration-300">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1D2564] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Authenticity Guaranteed",
                description:
                  "Every item is verified by our expert team for authenticity",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Premium Selection",
                description:
                  "Curated collection of luxury brands and designer pieces",
              },
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: "Worldwide Shipping",
                description: "Free express shipping on orders over $200",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-block p-4 rounded-full bg-white/10 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.2"%3E%3Cpolygon points="0 0 20 0 10 10"/%3E%3C/g%3E%3C/svg%3E")',
          }}
        />

        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-2xl mx-auto text-center relative"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
                Join Our <span className="font-medium">Community</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Get exclusive offers, early access, and curated style
                inspiration
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onSubmit={handleSubmit}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsValid(true);
                        }}
                        placeholder="Enter your email"
                        className={`w-full px-6 py-4 bg-white shadow-sm border ${isValid
                          ? "border-gray-200 focus:border-primary"
                          : "border-red-400"
                          } outline-none transition-all duration-300 rounded-lg`}
                      />
                      {!isValid && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 text-left"
                        >
                          Please enter a valid email address
                        </motion.p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center group"
                    >
                      Subscribe
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate={isExiting ? "exit" : "visible"}
                  exit="exit"
                  className="bg-green-50 text-green-800 p-6 rounded-lg shadow-sm"
                >
                  <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-medium mb-2">
                    Thank you for subscribing!
                  </h3>
                  <p className="text-green-700">
                    Welcome to our community. We&apos;ll keep you updated with the
                    latest news and offers.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
