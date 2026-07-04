"use client";

import { AnimatePresence, motion } from "framer-motion";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from "clsx";
import { useState } from "react";

const AccordionItem = ({ isOpen, title, description, onClick }) => {
  return (
    <div className="border-b border-border mt-4 transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-3 text-textMain bg-surface hover:bg-card transition-colors rounded-t-lg"
      >
        <span className="text-right font-medium">{title}</span>
        <ExpandMoreIcon
          className={clsx("w-12 h-12 md:h-5 md:w-5 text-accent transition-transform duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 text-sm text-textSecondary bg-surface">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="rounded-xl overflow-hidden bg-background">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title || item.question}
          description={item.description || item.answer}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
