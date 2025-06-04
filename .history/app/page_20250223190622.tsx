"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { InitialQuestions } from "@/components/InitialQuestions";
import { DynamicQuestions } from "@/components/DynamicQuestions";
import { OutfitReport } from "@/components/OutfitReport";
import { Compass, Sparkles, Palette, Scissors } from "lucide-react";
import { motion } from "framer-motion";

const StepIcon = ({ step }: { step: number }) => {
  const icons = {
    1: Compass,
    2: Palette,
    3: Scissors
  };
  const Icon = icons[step as keyof typeof icons];
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full blur opacity-75 animate-pulse" />
      <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-3">
        <Icon className="h-8 w-8 text-primary" />
      </div>
    </motion.div>
  );
};

const LoginForm = () => {
  return (
    <div className="relative w-64 h-96 flex flex-col items-center bg-white border-2 border-fuchsia-800 rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-none shadow-[rgba(0,0,0,0.2)_-10px_5px_5px] overflow-hidden transition-all duration-300 hover:w-72 hover:h-[25rem] group">
      {/* Decorative background elements */}
      <div className="absolute top-0 w-full h-14 bg-gradient-to-r from-fuchsia-600 to-pink-500 z-10 shadow-inner transition-all duration-500 group-hover:[transform:translateY(4rem)] group-hover:h-16" />
      <div className="absolute top-1 right-1 w-14 h-14 bg-white rounded-tr-lg shadow-[-35px_-35px_0_-1px_white]" />
      
      {/* Login Header */}
      <div className="relative w-full h-14 flex justify-center items-center z-20">
        <h2 className="text-2xl font-bold text-white">LOGIN</h2>
        <p className="absolute top-[60%] left-4 text-pink-200 font-bold">Log in to your fashion account</p>
      </div>

      {/* Email Input Area */}
      <div className="w-full px-[10%] h-20 flex flex-col justify-center items-center mt-4 transition-all duration-300 hover:px-[5%] group/email">
        <input 
          type="text"
          placeholder="EMAIL"
          className="w-full h-10 px-4 text-base border-2 border-fuchsia-500 rounded-lg shadow-md outline-none transition-all duration-500 group-hover/email:h-12 group-hover/email:bg-gradient-to-r group-hover/email:from-fuchsia-600 group-hover/email:to-pink-500 group-hover/email:text-white group-hover/email:border-white placeholder:text-fuchsia-500 group-hover/email:placeholder:text-white"
        />
      </div>

      {/* Password Input Area */}
      <div className="w-full px-[10%] h-24 flex flex-col justify-end items-end transition-all duration-300 hover:px-[5%] group/password">
        <input 
          type="password"
          placeholder="PASSWORD"
          className="w-full h-10 px-4 text-base border-2 border-fuchsia-500 rounded-lg shadow-md outline-none transition-all duration-300 group-hover/password:h-12 group-hover/password:bg-gradient-to-r group-hover/password:from-fuchsia-600 group-hover/password:to-pink-500 group-hover/password:text-white group-hover/password:border-white placeholder:text-fuchsia-500 group-hover/password:placeholder:text-white"
        />
        <a className="pt-2 text-sm font-bold text-fuchsia-500 cursor-pointer transition-all duration-300 group-hover/password:text-white group-hover/password:pr-[5%]">
          Forgot password?
        </a>
      </div>

      {/* Footer Area */}
      <div className="w-full px-[10%] h-28 flex flex-col justify-center items-center text-fuchsia-500 transition-all duration-300 hover:px-[5%] group/footer">
        <button className="w-full h-10 px-4 text-base font-bold text-white bg-gradient-to-r from-fuchsia-600 to-pink-500 border-2 border-fuchsia-500 rounded-lg shadow-md transition-all duration-300 hover:border-white hover:h-12 active:bg-white active:text-fuchsia-500 active:w-[90%]">
          Log In
        </button>
        <div className="flex pt-2">
          <p className="text-sm">Don't have an account?</p>
          <a className="text-sm font-bold ml-1 cursor-pointer">Sign Up</a>
        </div>
      </div>

      {/* Social Links */}
      <div className="w-full h-16 flex items-center justify-around px-[15%]">
        <SocialIcon icon="facebook" />
        <SocialIcon icon="instagram" />
        <SocialIcon icon="linkedin" />
      </div>
    </div>
  );
};

const SocialIcon = ({ icon }: { icon: string }) => {
  const getPath = () => {
    switch(icon) {
      case 'facebook':
        return "M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm4 7.278V4.5h-2.286c-2.1 0-3.428 1.6-3.428 3.889v1.667H8v2.777h2.286V19.5h2.857v-6.667h2.286L16 10.056h-2.857V8.944c0-1.11.572-1.666 1.714-1.666H16z";
      case 'instagram':
        return "M12 0c6.6274 0 12 5.3726 12 12s-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0zm3.115 4.5h-6.23c-2.5536 0-4.281 1.6524-4.3805 4.1552L4.5 8.8851v6.1996c0 1.3004.4234 2.4193 1.2702 3.2359.7582.73 1.751 1.1212 2.8818 1.1734l.2633.006h6.1694c1.3004 0 2.389-.4234 3.1754-1.1794.762-.734 1.1817-1.7576 1.2343-2.948l.0056-.2577V8.8851c0-1.2702-.4234-2.3589-1.2097-3.1452-.7338-.762-1.7575-1.1817-2.9234-1.2343l-.252-.0056zM8.9152 5.8911h6.2299c.9072 0 1.6633.2722 2.2076.8166.4713.499.7647 1.1758.8103 1.9607l.0063.2167v6.2298c0 .9375-.3327 1.6936-.877 2.2077-.499.4713-1.176.7392-1.984.7806l-.2237.0057H8.9153c-.9072 0-1.6633-.2722-2.2076-.7863-.499-.499-.7693-1.1759-.8109-2.0073l-.0057-.2306V8.885c0-.9073.2722-1.6633.8166-2.2077.4712-.4713 1.1712-.7392 1.9834-.7806l.2242-.0057h6.2299-6.2299zM12 8.0988c-2.117 0-3.871 1.7238-3.871 3.871A3.8591 3.8591 0 0 0 12 15.8408c2.1472 0 3.871-1.7541 3.871-3.871 0-2.117-1.754-3.871-3.871-3.871zm0 1.3911c1.3609 0 2.4798 1.119 2.4798 2.4799 0 1.3608-1.119 2.4798-2.4798 2.4798-1.3609 0-2.4798-1.119-2.4798-2.4798 0-1.361 1.119-2.4799 2.4798-2.4799zm4.0222-2.3589a.877.877 0 1 0 0 1.754.877.877 0 0 0 0-1.754z";
      case 'linkedin':
        return "M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zM8.951 9.404H6.165V17.5H8.95V9.404zm6.841-.192c-1.324 0-1.993.629-2.385 1.156l-.127.181V9.403h-2.786l.01.484c.006.636.007 1.748.005 2.93l-.015 4.683h2.786v-4.522c0-.242.018-.484.092-.657.202-.483.66-.984 1.43-.984.955 0 1.367.666 1.408 1.662l.003.168V17.5H19v-4.643c0-2.487-1.375-3.645-3.208-3.645zM7.576 5.5C6.623 5.5 6 6.105 6 6.899c0 .73.536 1.325 1.378 1.392l.18.006c.971 0 1.577-.621 1.577-1.398C9.116 6.105 8.53 5.5 7.576 5.5z";
      default:
        return "";
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-fuchsia-500 transition-all duration-300 hover:scale-125 hover:mx-2"
    >
      <path d={getPath()} />
    </svg>
  );
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    religion: "",
    occasion: "",
    timeOfDay: "morning",
    dynamicResponses: {},
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleInitialSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleDynamicSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      dynamicResponses: data.responses,
      dynamicQuestions: data.questions 
    }));
    setStep(3);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#ffe8f3] to-[#d9f3ff]" />
      
      {/* Animated gradient container */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[gradient_3s_linear_infinite]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <StepIcon step={step} />
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            #OOTD
          </h1>
          <p className="text-lg text-neutral-800">
            Your AI Fashion Curator
          </p>
        </motion.div>

        <motion.div 
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Progress 
            value={progress} 
            className="h-2 bg-gradient-to-r from-rose-200 via-fuchsia-200 to-indigo-200"
          />
          <div className="flex justify-between mt-2 text-sm text-neutral-800">
            <span>Style Profile</span>
            <span>Preferences</span>
            <span>Your Look</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          {/* Content box with glass effect */}
          <div className="relative px-8 py-10 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20">
            <div className="relative">
              {step === 1 && (
                <InitialQuestions
                  onSubmit={handleInitialSubmit}
                  formData={formData}
                />
              )}
              {step === 2 && (
                <DynamicQuestions
                  onSubmit={handleDynamicSubmit}
                  initialData={formData}
                />
              )}
              {step === 3 && <OutfitReport formData={formData} />}
            </div>
          </div>
        </motion.div>

        {/* Login Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <LoginForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-neutral-800"
        >
          <Sparkles className="inline-block h-4 w-4 mr-2" />
          Fashion intelligence at your service
        </motion.div>
      </div>

      {/* Add keyframes for gradient animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .container-bg {
          background: linear-gradient(
            45deg,
            transparent 25%,
            rgba(68, 68, 68, 0.2) 50%,
            transparent 75%,
            transparent 100%
          );
          background-size: 20px 20px;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
}