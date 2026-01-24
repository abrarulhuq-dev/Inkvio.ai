import AnimatedLogo from "./LogoAnimate";
import { AnimatedText } from "./TextAnimate";


export default function BrandIntro() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex items-center">
        <AnimatedLogo />
        <AnimatedText />
      </div>
    </div>
  );
}
