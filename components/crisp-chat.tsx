"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0d01706f-2ea8-4a1d-abc6-8b8f46d8f121");
  }, []);

  return null;
};