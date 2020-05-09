import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";

// css
import "./Gauge.css";

const Gauge = ({ likedBy, name }) => {
  const min = 0;
  const max = 100;
  const value = likedBy;
  const label = "des visiteurs aiment";

  //ARC GENERATOR for background
  const backgroundArc = arc()
    // épaisseur rond interne
    .innerRadius(0.65)
    // épaisseur rond externe
    .outerRadius(1)
    // ==> our arc's radius will start at 0.65 and end at 1, ending up 0.35 units wide
    // début de l'arc à gauche (top = 0) > one quarter turn counterclockwise
    .startAngle(-Math.PI / 2)
    // fin de l'arc à droite (top = 6.2)
    .endAngle(Math.PI / 2)
    // bouts de l'arc
    .cornerRadius(1)(); // () to call the fonction.

  // to determine how much % the value is equal to
  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const percent = percentScale(value);

  // end angle to fill till
  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    // to not go outside of the range :
    .clamp(true);
  const angle = angleScale(percent);

  // now filling till this end angle
  const filledArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)();

  // design a gradient color
  const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#BAEEBA", "forestgreen"]);
  // devide the gradient into steps
  const gradientSteps = colorScale.ticks(10).map((value) => colorScale(value));

  // add a bubble in case it goes to 0 or 100
  const markerLocation = getCoordsOnArc(
    angle,
    // rayon du rond :
    1 - (1 - 0.65) / 2
  );

  return (
    <div className="gauge-view">
      <svg
        style={{
          width: "11em",
          // + height to see the arrow
          height: "8em",
        }}
        // viewBox: "-1 -1 2 1" =
        viewBox={[-1, -1, 2, 1].join(" ")}
      >
        {/* defs are not rendered :  */}
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse" // = default use of parent svg
            x1="-1"
            x2="1"
            y2="0"
          >
            {/* creating gradient stops, which tell the gradient where each color should fall: */}
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path d={backgroundArc} fill="#dbdbe7" />
        <path d={filledArc} fill="url(#Gauge__gradient)" />
        {/* line to show the middle : y1 = depart, 0,65 = épaisseur du rond interne donc stop de la ligne, */}
        <line y1="-1" y2="-0.65" stroke="#bcbcbc" strokeWidth="0.027" />
        {/* bubble :  */}
        <circle
          // circle center position :
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          // rayon :
          r="0.2"
          // border :
          stroke="#2c3e50"
          strokeWidth="0.005"
          // color fill
          fill={colorScale(percent)}
        />
        <path
          // svg file from Illustrator vector graphic
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          // to rotate, need to transform angle radians into degrees. Then need transform to rotate around middle point and not around left top corner
          transform={`rotate(${
            angle * (180 / Math.PI)
          }) translate(-0.2, -0.33)`}
          //color :
          fill="#6a6a85"
        />
      </svg>
      <p className="gauge-info mt-20">
        {/* to replace . by , */}
        &nbsp; {format(",")(value)} %
      </p>

      <p
        style={{
          color: "#8b8ba7",
          fontSize: "1.3em",
          // lineHeight: "1.3em",
          fontWeight: "700",
        }}
      >
        {label}
      </p>
      <p className="gauge-info fs-30">{name}</p>
    </div>
  );
};

const getCoordsOnArc = (angle, offset = 10) => [
  //cosinus in radians
  Math.cos(angle - Math.PI / 2) * offset,
  //sinus entre 0 et 1 = rapport côté opposé et hypoténus
  Math.sin(angle - Math.PI / 2) * offset,
];

export default Gauge;
