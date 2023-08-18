"use client";
import { motion } from "framer-motion";

type Props = {
  variants: any;
  className: string;
  children: React.ReactNode;
  infinity?: string;
  style?: object;
};
export default function AnimatedDiv({
  variants,
  className,
  children,
  infinity,
  style,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
      style={style}
      transition={{ staggerChildren: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
