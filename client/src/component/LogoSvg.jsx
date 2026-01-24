import { motion } from "framer-motion";

const DRAW_DURATION = 1;

// Path animation: draw stroke only
const pathVariant = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: DRAW_DURATION,
      ease: "easeInOut",
    },
  },
};

// Container controls sequencing + full color reveal
const container = {
  hidden: {
    color: "#5C289D", // stroke color while drawing
    fillOpacity: 0,
  },
  visible: {
    color: "#1A1A40", // final logo color (fallback)
    fillOpacity: 1,
    strokeOpacity: 0,
    transition: {
      staggerChildren: DRAW_DURATION,
      when: "afterChildren",
      fillOpacity: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeInOut",
      },
      repeat: Infinity,
      repeatDelay: 1.2,
    },
  },
};

const paths = [
  "M7.00879 21.043C6.66283 21.3744 6.22416 21.5557 5.77148 21.5557H0L7.0918 14.7246C7.43823 14.391 7.87776 14.2081 8.33203 14.208H8.37207C7.91945 14.208 7.48163 14.0177 7.13574 13.6719L0 6.53906H5.77051C6.2239 6.53907 6.66261 6.7293 7.00879 7.07617L14.127 14.208H14.1436L7.00879 21.043Z",
  "M26.3721 4.9375C26.3721 5.53853 26.0826 6.10908 25.5811 6.49805L17.127 13.0508L9.35938 6.49805C8.89852 6.10908 8.63281 5.53853 8.63281 4.9375V0L16.4004 6.55176C16.8613 6.94067 17.1269 7.51135 17.127 8.1123C17.127 7.51129 17.4163 6.94068 17.918 6.55176L26.3721 0V4.9375Z",
  "M25.5811 21.6201C26.0828 22.0077 26.3721 22.5768 26.3721 23.1758V28.0967L17.918 21.5674C17.4161 21.1798 17.127 20.6108 17.127 20.0117C17.127 20.6107 16.8614 21.1798 16.4004 21.5674L8.63281 28.0967V23.1758C8.63281 22.5768 8.89837 22.0077 9.35938 21.6201L17.127 15.0908L25.5811 21.6201Z",
  "M20.8555 14.208H20.875L27.9932 7.07617C28.3393 6.72929 28.7781 6.53906 29.2314 6.53906H35.002L27.8662 13.6719C27.5203 14.0177 27.0824 14.2079 26.6299 14.208H26.667C27.1215 14.208 27.5616 14.3925 27.9082 14.7295L35 21.625H29.2275C28.775 21.6249 28.3371 21.4418 27.9912 21.1074L20.8555 14.208Z",
];

// 🔥 Gradient sweep animation
const gradientVariant = {
  hidden: {
    x1: "0%",
    x2: "0%",
  },
  visible: {
    x1: "100%",
    x2: "140%",
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      delay: DRAW_DURATION * paths.length, // wait until all strokes finish
    },
  },
};

export default function LogoSVG() {
  return (
    <motion.svg
      viewBox="0 0 35 29"
      className="w-50"
      variants={container}
      initial="hidden"
      animate="visible"
      fill="url(#logoGradient)" // 🔥 gradient fill
    >
      {/* 🔥 Gradient definition */}
      <defs>
        <motion.linearGradient
          id="logoGradient"
          gradientUnits="userSpaceOnUse"
          variants={gradientVariant}
          initial="hidden"
          animate="visible"
        >
          <stop offset="0%" stopColor="#1A1A40" />
          <stop offset="50%" stopColor="#5C289D" />
          <stop offset="100%" stopColor="#1A1A40" />
        </motion.linearGradient>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          variants={pathVariant}
          stroke="currentColor"
          fill="url(#logoGradient)" // 🔥 gradient AFTER stroke
          strokeWidth="0.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      ))}
    </motion.svg>
  );
}
