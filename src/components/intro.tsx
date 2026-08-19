"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const KEY = "hiredesk.seenIntro.v2";

const STEPS = [
  {
    kicker: "Welcome",
    title: "This is a hiring desk, not a trading bot.",
    body: "BNB Chain already has AI agents that can work on your DeFi positions. HIREDESK is the shop in front of them: find one, understand it, hire it, fire it.",
  },
  {
    kicker: "Four desks",
    title: "Every job type is a first-class page.",
    body: "Health Factor protects a Venus loan. Rebalancing manages a Pancake LP. Grid trades one pair inside bounds. Yield parks idle USDT. Same hire flow on all four — that is the whole marketplace.",
  },
  {
    kicker: "How a hire works",
    title: "Read the move. Cap the damage. Revoke anytime.",
    body: "Dry run shows the next action in English before anything happens. You set a USDT spend cap and an expiry. Revoke is one tap. The agent never gets your seed phrase.",
  },
  {
    kicker: "No wallet on purpose",
    title: "Safer this way for a first visit.",
    body: "Connect Wallet would stop most people: no MetaMask, no test BNB, no Venus loan. The guided demo uses play money so you can finish in two minutes. Your own wallet comes later, as an option — never as the front door.",
  },
];

export function openIntro() {
  window.dispatchEvent(new Event("hiredesk:open-intro"));
}

export function Intro() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setOpen(true);
    const show = () => {
      setStep(0);
      setOpen(true);
    };
    window.addEventListener("hiredesk:open-intro", show);
    return () => window.removeEventListener("hiredesk:open-intro", show);
  }, []);

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setOpen(false);
    setStep(0);
  }

  function start() {
    dismiss();
    router.push("/demo");
  }

  if (!open) return null;

  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-line bg-[#111113] p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{current.kicker}</p>
          <p className="text-[11px] text-muted">
            {step + 1} / {STEPS.length}
          </p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-white" : "bg-white/15"}`}
            />
          ))}
        </div>
        <h2 className="mt-5 text-2xl font-semibold leading-tight">{current.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{current.body}</p>

        <div className="mt-6 flex gap-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="rounded-2xl border border-line px-4 py-3 text-sm"
            >
              Back
            </button>
          ) : null}
          {last ? (
            <button type="button" onClick={start} className="btn-primary">
              Start guided demo
            </button>
          ) : (
            <button type="button" onClick={() => setStep((s) => s + 1)} className="btn-primary">
              Next
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 w-full py-2 text-sm text-muted hover:text-ink"
        >
          Browse desks
        </button>
      </div>
    </div>
  );
}

export function HowThisWorks() {
  return (
    <button type="button" onClick={openIntro} className="hover:text-ink">
      How this works
    </button>
  );
}
