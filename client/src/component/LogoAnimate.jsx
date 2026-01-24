import { motion } from "framer-motion";
import LogoSVG from "./LogoSvg";

const LOGO_DONE = 1.2 * 4 + 0.6;
export default function AnimatedLogo() {
  return (
    <motion.div
      className="relative z-20 bg-white "
      initial={{ x: 190 }}
      animate={{ x: -10 }}
      transition={{
        delay: LOGO_DONE,
        duration: 0.7,
        ease: "easeInOut",
      }}
    >
      <LogoSVG />
    </motion.div>
  );
}
