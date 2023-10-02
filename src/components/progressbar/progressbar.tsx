import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface Progressbar {
  percentage: number
}
const Progressbar: React.FC<ProgressCard> = ({ percentage }) => {
  let strokeColor = "#00FF00"; // Green color by default
  if (percentage < 50) {
    strokeColor = "#FF0000"; // Red color for low percentages
  } else if (percentage < 80) {
    strokeColor = "#FFFF00"; // Yellow color for medium percentages
  }
  return (
    <CircularProgressbar
      value={percentage}
      text={`${Math.round(percentage)}%`}
      styles={{
        // Customize the root svg element
        root: {},
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke: strokeColor, // Red color with transparency
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "round",
          // Customize transition animation
          transition: "stroke-dashoffset 0.5s ease 0s",
          // Rotate the path
          transform: "rotate(1turn)",
          transformOrigin: "center center",
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: "#423D0F",
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",
          // Rotate the trail
          transform: "rotate(0.25turn)",
          transformOrigin: "center center",
        },
        // Customize the text
        text: {
          // Text color
          fill: "#fff",
          // Text size
          fontSize: "24px",
          fontWeight: "bold",
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: "#3E98C7",
        },
      }}
    />
  );
};

export default Progressbar