"use client";

import { useState, useId, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import axios from "axios";
import { useSession } from "next-auth/react";
// or your version

type CardProps = {
  id: string;
  name: string;
  about_space: string;
  src: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  content: string;
  status :string;
  workspaceId:string
};

type ExpandableCardDemoProps = {
  cards: CardProps[];
};

export default function ExpandableCardDemo({ cards }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<CardProps | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const { data: session } = useSession()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  // console.log(active)


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
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-neutral-900 dark:bg-white rounded-full h-6 w-6"
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
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-neutral-200 dark:text-neutral-700"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-400 dark:text-neutral-600"
                    >
                      {active.description}
                    </motion.p>
                    <p className="text-sm mt-1 text-neutral-500 dark:text-neutral-500">
                      {active.about_space}
                    </p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.name}-${id}`}
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
                    className="text-neutral-400 line-clamp-5 dark:text-neutral-600 text-xs md:text-sm lg:text-base h-20 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto"
                  >
                    {active.content}
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-row gap-10 mx-3 ">
                {/* REMOVE MEMBER BUTTON */}

                {(active !== null && (active.status !== 'left' && active.status !== 'removed')) && <button
                  className=" px-4 py-2 text-sm my-4 relative bg-gradient-to-br from-gray-800 to-black text-white px-3 py-1 rounded-lg border border-gray-500 shadow-md hover:scale-105 transform transition-all duration-200 hover:shadow-red-500/50 text-sm z-10"
                  onClick={async () => {
                    const confirmed = window.confirm("Are you sure you want to remove this member from your Pic-Space? This will not delete the data shared by you.");
                    if (!confirmed) return;

                    //   alert("Deleting Pic-Space... It may take few time.")

                    // console.log(`Left space with workspace id: ${active.id}}`);

                    try {
                      const result = await axios.post("/api/leftWorkspace", {
                        workspaceId : active.workspaceId,
                        userId: session?.user.id,
                        friendId : active.id
                      });

                      // console.log(result);
                      if (result.data.status === 204) {
                        alert("removed sucessfully");
                        window.location.reload();
                      } else {
                        // console.log(result.data);
                        alert("Error !!");
                      }
                    } catch (err) {
                      // console.log(err);
                    }
                  }}
                >
                  Remove this member
                </button>}

                {/* DELETE MEMBER BUTTON */}

                {active !== null && <button
                  className=" px-4 py-2 text-sm my-4 relative bg-gradient-to-br from-gray-800 to-black text-white px-3 py-1 rounded-lg border border-gray-500 shadow-md hover:scale-105 transform transition-all duration-200 hover:shadow-red-500/50 text-sm z-10"
                  onClick={async () => {
                    const confirmed = window.confirm("Are you sure you want to delete this member in your Pic-Space? This will delete!! all the data shared by you.");
                    if (!confirmed) return;

                    const confirmedAgain = window.confirm("Are you sure you want to delete this member in your Pic-Space? This will delete!! all the data shared by you.");
                    if (!confirmedAgain) return;

                    //   alert("Deleting Pic-Space... It may take few time.")

                    // console.log(`Left space with workspace id: ${active.id}}`);

                    try {
                      const result = await axios.post("/api/deleteUser", {
                        workspaceId: active.workspaceId,
                        adminId: session?.user.id,
                        userId: active.id
                      });

                      // console.log(result);
                      if (result.data.status === 204) {
                        alert("Deleted sucessfully");
                        window.location.reload();
                      } else {
                        console.log(result.data);
                        alert("Error !!");
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Delete this member
                </button>}

              </div>

            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center
             hover:bg-neutral-800 dark:hover:bg-neutral-50 rounded-xl cursor-pointer
             border-[1px] border-amber-100 mb-5"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.name}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="font-medium text-neutral-200 dark:text-neutral-800 text-center md:text-left"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-400 dark:text-neutral-600 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
                <p className="text-sm text-center md:text-left text-neutral-500 dark:text-neutral-500">
                  {card.about_space}
                </p>
              </div>
            </div>

            <motion.button
              layoutId={`button-${card.name}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-neutral-800 dark:bg-gray-100 hover:bg-green-500 hover:text-white text-white dark:text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>

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
    className="h-4 w-4 text-white dark:text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
