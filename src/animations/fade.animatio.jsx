import React from "react";
import { motion } from "framer-motion";

export const FadeInView = ({ duration = 1.5, style, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration }}
      style={style}
    >
      {children}
    </motion.div>
  );
};
