// import { useState } from "react";
// import { useCart } from "../../contexts/CartContext";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import watch1 from "../../assets/watch1.jpg";

// const Collection = () => {
//   const [wishlist, setWishlist] = useState(false);
//   const { addItem } = useCart();

//   const product = {
//     id: 1,
//     name: "Royal Chronograph",
//     price: 24999,
//     image: watch1,
//   };

//   const toggleWishlist = () => {
//     setWishlist(!wishlist);
//   };

//   return (
//     <div className="bg-[#0b1220] min-h-screen text-white px-6 py-16">
//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <h1 className="text-3xl font-bold mb-10">Our Collection</h1>

//         {/* PRODUCT CARD */}
//         <div className="bg-[#101a2f] rounded-xl overflow-hidden shadow-lg w-[280px]">

//           {/* IMAGE */}
//           <div className="relative aspect-[4/3] w-full">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />

//             {/* WISHLIST ICON */}
//             <button
//               onClick={toggleWishlist}
//               className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
//             >
//               {wishlist ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart className="text-white" />
//               )}
//             </button>
//           </div>

//           {/* CONTENT */}
//           <div className="p-4">
//             <h2 className="text-lg font-semibold">{product.name}</h2>

//             <p className="text-blue-400 mt-1 font-medium">
//               ₹ {product.price}
//             </p>

//             {/* BUTTONS */}
//             <div className="mt-4 space-y-2">
//               {/* BUY NOW */}
//               <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
//                 Buy Now
//               </button>

//               {/* ADD TO CART */}
//               <button
//                 onClick={() => addItem(product, 1)}
//                 className="w-full border border-gray-600 py-2 rounded-lg hover:bg-white hover:text-black transition"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Collection;
import React from 'react'

const Collections = () => {
  return (
    <div>Collections</div>
  )
}

export default Collections