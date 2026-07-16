"use client";

import React, { useEffect, useRef, useState } from "react";

import FullscreenImage from "../FullscreenImage";
import { generatorProjects } from "@/constants/landing/projects";
import { faText, text } from "@/lib/landing/copy";

const resizeAllGridItems = (gridRef) => {
  const gridItems = gridRef.querySelectorAll(".grid-item");
  gridItems.forEach(resizeGridItem);
};

const resizeGridItem = (item) => {
  const grid = item.parentElement;
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  const contentHeight = item
    .querySelector(".grid-content")
    .getBoundingClientRect().height;
  const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = `span ${rowSpan}`;
};

const GeneratorsProjectsPageWrapper = () => {
  const t = text;
  

  const outerGridRef = useRef(null);
  const innerGridRefs = useRef([]);

  const [fullscreenData, setFullscreenData] = useState({
    open: false,
    slides: [],
    initialIndex: 0,
  });

  const openFullscreen = (slides, index) => {
    setFullscreenData({ open: true, slides, initialIndex: index });
  };

  useEffect(() => {
    innerGridRefs.current.forEach((gridEl) => {
      if (gridEl) {
        resizeAllGridItems(gridEl);
        const allItems = gridEl.querySelectorAll(".grid-item");

        // Add ResizeObserver to each item
        const ro = new ResizeObserver(() => resizeAllGridItems(gridEl));
        allItems.forEach((item) => ro.observe(item));

        // Cleanup
        return () => ro.disconnect();
      }
    });
  }, []);

  return (
    <div className="px-4 md:px-8 py-12">
      <h1 className="text-lg md:text-2xl font-semibold">
        {t("newest_generator_projects")}
      </h1>

      <p className="mt-4">{t("click_to_magnify")}</p>

      <div className="relative">
        <div
          ref={outerGridRef}
          className="outer-grid flex flex-wrap m-4 clearfix"
        >
          {generatorProjects.map((project, projIndex) => (
            <div
              key={projIndex}
              className="project-item border-style p-4 w-full md:w-1/2 xl:w-1/3"
            >
              <div className="mt-4">
                <h2 className="text-md md:text-lg font-medium mb-4">
                  {faText(project.title)}
                </h2>
              </div>

              <div
                ref={(el) => (innerGridRefs.current[projIndex] = el)}
                className="inner-grid grid gap-2"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridAutoRows: "10px",
                }}
              >
                {project.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="grid-item"
                    onClick={() => openFullscreen(project.images, imgIndex)}
                  >
                    <div className="grid-content rounded-md overflow-hidden shadow-sm cursor-pointer">
                      <img
                        src={img}
                        alt={project.title}
                        className="w-full object-cover"
                        onLoad={(e) => {
                          const item = e.currentTarget.closest(".grid-item");
                          if (item) resizeGridItem(item);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {fullscreenData.open && (
        <FullscreenImage
          slides={fullscreenData.slides}
          initialSlide={fullscreenData.initialIndex}
          onClose={() =>
            setFullscreenData({ open: false, slides: [], initialIndex: 0 })
          }
        />
      )}
    </div>
  );
};

export default GeneratorsProjectsPageWrapper;
