export const setSliderItems = (items) => {
  const finalItems = [];

  items.map((item, index) =>
    finalItems.push(
      <img
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "460px",
          borderRadius: "10px",
          objectFit: "cover",
        }}
        key={index}
        alt={`Slider image ${index + 1}`}
        src={item}
      />
    )
  );

  return finalItems;
};
