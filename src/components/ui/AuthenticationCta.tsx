"use client";

import { useState } from "react";
import AuthenticationModal, { type AuthRequestType } from "./AuthenticationModal";

interface CtaButton {
  type: AuthRequestType;
  label: string;
  style?: "primary" | "outline";
}

interface AuthenticationCtaProps {
  buttons: CtaButton[];
  size?: "lg" | "md";
  className?: string;
}

const BASE =
  "font-cinzel font-bold tracking-widest uppercase text-sm transition-all duration-300";
const SIZES = { lg: "px-10 py-5", md: "px-8 py-4" };

export default function AuthenticationCta({
  buttons,
  size = "lg",
  className = "flex flex-col sm:flex-row gap-5 justify-center items-center",
}: AuthenticationCtaProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AuthRequestType>("authentication");

  function openWith(requestType: AuthRequestType) {
    setType(requestType);
    setOpen(true);
  }

  return (
    <>
      <div className={className}>
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => openWith(btn.type)}
            className={
              btn.style === "outline"
                ? `${BASE} ${SIZES[size]} border border-primary/60 text-primary hover:border-primary`
                : `${BASE} ${SIZES[size]} primary-cta-gradient text-on-primary glow-gold hover:scale-105`
            }
          >
            {btn.label}
          </button>
        ))}
      </div>

      <AuthenticationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        defaultType={type}
      />
    </>
  );
}
