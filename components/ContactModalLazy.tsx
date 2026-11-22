"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Performance wrapper: ContactModal (bara form component) initial
 * page JS mein shamil nahi hota. Is ki chunk tab load hoti hai jab
 * page idle ho jaye, ya pehli dafa "open-contact-modal" event aye —
 * jo bhi pehle ho. Agar event chunk se pehle aa jaye to usay yaad
 * rakh kar modal mount hotay hi dobara bhej diya jata hai (React
 * mein child ke effects parent se pehle chalte hain, is liye modal
 * ka listener tab tak lag chuka hota hai), taake pehla click kabhi
 * zaya na ho.
 */
export default function ContactModalLazy() {
  const [Modal, setModal] = useState<ComponentType | null>(null);
  const loadingRef = useRef(false);
  const readyRef = useRef(false);
  const pendingRef = useRef<string | null>(null);

  useEffect(() => {
    const ensureLoad = () => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      import("./ContactModal").then((m) => setModal(() => m.default));
    };

    const onOpen = (e: Event) => {
      if (readyRef.current) return; // modal ka apna listener sambhal lega
      pendingRef.current = (e as CustomEvent<string>).detail ?? "";
      ensureLoad();
    };
    window.addEventListener("open-contact-modal", onOpen);

    // Idle par pehle se load kar lo taake aam halat mein pehla click
    // bhi foran khulay.
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => ensureLoad(), {
        timeout: 3000,
      });
    } else {
      timer = setTimeout(ensureLoad, 2000);
    }

    return () => {
      window.removeEventListener("open-contact-modal", onOpen);
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Modal mount ho gaya: agar koi click chunk se pehle aya tha to
  // us ka event ab dobara bhejo — modal ka listener (child effect)
  // is parent effect se pehle lag chuka hoga.
  useEffect(() => {
    if (!Modal) return;
    readyRef.current = true;
    if (pendingRef.current !== null) {
      const detail = pendingRef.current;
      pendingRef.current = null;
      window.dispatchEvent(
        new CustomEvent<string>("open-contact-modal", { detail })
      );
    }
  }, [Modal]);

  if (!Modal) return null;
  return <Modal />;
}
