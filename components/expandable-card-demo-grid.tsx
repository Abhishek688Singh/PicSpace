"use client";
import { useSession } from "next-auth/react"
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import axios from "axios";

type Card = {
  id: string;
  name: string;
  about_space: string;
  src: string;
  description: string;
  workspaceId: string;
  ctaText: string;
  ctaLink: string;
  content: string | (() => React.ReactNode);
};

export default function ExpandableCardDemo({ cards }: { cards: Card[] }) {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const { data: session } = useSession()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full h-6 w-6 flex items-center justify-center"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 dark:bg-white sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  src={active.src}
                  alt={active.name}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-medium text-white dark:text-neutral-800 text-base"
                    >
                      {active.name}
                    </motion.h3>

                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-400 dark:text-neutral-600 text-base"
                    >
                      {active.description}
                    </motion.p>
                    <motion.p
                      layoutId={`workspaceId-${active.workspaceId}-${id}`}
                      className="text-neutral-400 dark:text-neutral-600 text-base"
                    >
                      {active.workspaceId}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-400 dark:text-neutral-700 text-sm md:text-base h-40 pb-10 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ---------------------------------------------USE CARD.ID TO DELETE A CARD */}
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            layoutId={`card-${card.name}-${idx}`}
            key={idx}
            onClick={() => setActive(card)}
            className="p-4 border-1 border-white hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col gap-4">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <img
                  src={card.src}
                  alt={card.name}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>

              <div className="text-center">
                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="font-medium text-white dark:text-neutral-800 text-base"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.id}-${id}`}
                  className="text-neutral-400 dark:text-neutral-700 text-base"
                >
                  {card.id}
                </motion.p>

                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-400 dark:text-neutral-700 text-base"
                >
                  {card.about_space}
                </motion.p>                
              </div>
              {/* Delete button */}
              <button
                className="relative bg-gradient-to-br from-gray-800 to-black text-white px-3 py-1 rounded-lg border border-gray-500 shadow-md hover:scale-105 transform transition-all duration-200 hover:shadow-red-500/50 text-sm z-10"
                onClick={async () => {
                  const confirmed = window.confirm("Are you sure you want to delete this Pic-Space? This will delete all the data available in this Space.");
                  if (!confirmed) return;
                  const reConfirmed = window.confirm("Are you really want to delete this Pic-Space? This can't be undone!");
                  if (!reConfirmed) return;
                  alert("Deleting Pic-Space... It may take few time.")
                  
                  const Uid = session?.user.id;


                  // console.log(`Delete space with workspace id: ${card.id}}`);

                  try {
                    const result = await axios.post("/api/deleteWorkspace", {
                      workspaceId: card.id,
                      userId:Uid
                    });

                    // console.log(result);
                    if (result.data.status === 204) {
                      alert("Deleted sucessfully");
                      window.location.reload();
                    } if (result.data.status === 403) {
                      alert("Only admin delete a Pic-Space. You are not allowed to perform this task.");
                    }else {
                      console.log(result.data);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}

      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
