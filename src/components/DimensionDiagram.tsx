import { useId } from "react";

// Technical-drawing style dimension diagram: a scaled silhouette of the
// piece with arrowed measurement lines, so size reads visually instead of
// as bare numbers. Depth (if given) is called out as a caption underneath
// since a flat diagram can't show true depth without a fake perspective.

interface DimensionDiagramProps {
  width: number;   // cm
  height: number;  // cm
  depth?: number;  // cm
  className?: string;
}

const MAX_SIDE = 140;
const MARGIN = 18;
const EXT_GAP = 10;
const RIGHT_SPACE = 42;
const BOTTOM_SPACE = 32;

export function DimensionDiagram({ width, height, depth, className }: DimensionDiagramProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const startArrow = `dim-start-${uid}`;
  const endArrow = `dim-end-${uid}`;

  const scale = MAX_SIDE / Math.max(width, height);
  const rectW = width * scale;
  const rectH = height * scale;

  const x0 = MARGIN;
  const y0 = MARGIN;
  const x1 = x0 + rectW;
  const y1 = y0 + rectH;

  const viewW = x1 + EXT_GAP + RIGHT_SPACE;
  const viewH = y1 + EXT_GAP + BOTTOM_SPACE;

  const widthLineY = y1 + EXT_GAP;
  const heightLineX = x1 + EXT_GAP;
  const midX = (x0 + x1) / 2;
  const midY = (y0 + y1) / 2;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="w-full max-w-[200px] mx-auto text-ink"
        role="img"
        aria-label={`${width} by ${height} centimeters${depth != null ? `, ${depth} cm deep` : ""}`}
      >
        <defs>
          <marker id={startArrow} viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 10 0 L 0 5 L 10 10 Z" fill="currentColor" />
          </marker>
          <marker id={endArrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="currentColor" />
          </marker>
        </defs>

        {/* Piece silhouette */}
        <rect
          x={x0}
          y={y0}
          width={rectW}
          height={rectH}
          rx={3}
          fill="currentColor"
          fillOpacity={0.05}
          stroke="currentColor"
          strokeWidth={1.5}
        />

        {/* Width — extension lines + arrowed dimension line + label */}
        <line x1={x0} y1={y1} x2={x0} y2={widthLineY} stroke="currentColor" strokeOpacity={0.3} />
        <line x1={x1} y1={y1} x2={x1} y2={widthLineY} stroke="currentColor" strokeOpacity={0.3} />
        <line
          x1={x0}
          y1={widthLineY}
          x2={x1}
          y2={widthLineY}
          stroke="currentColor"
          markerStart={`url(#${startArrow})`}
          markerEnd={`url(#${endArrow})`}
        />
        <text x={midX} y={widthLineY + 13} textAnchor="middle" fontSize="9" fontWeight={700} fill="currentColor">
          {width} cm
        </text>

        {/* Height — extension lines + arrowed dimension line + label */}
        <line x1={x1} y1={y0} x2={heightLineX} y2={y0} stroke="currentColor" strokeOpacity={0.3} />
        <line x1={x1} y1={y1} x2={heightLineX} y2={y1} stroke="currentColor" strokeOpacity={0.3} />
        <line
          x1={heightLineX}
          y1={y0}
          x2={heightLineX}
          y2={y1}
          stroke="currentColor"
          markerStart={`url(#${startArrow})`}
          markerEnd={`url(#${endArrow})`}
        />
        <text
          x={heightLineX + 12}
          y={midY}
          textAnchor="middle"
          fontSize="9"
          fontWeight={700}
          fill="currentColor"
          transform={`rotate(-90, ${heightLineX + 12}, ${midY})`}
        >
          {height} cm
        </text>
      </svg>

      {depth != null && (
        <p className="text-center text-[10px] text-ink/65 font-light mt-2 uppercase tracking-widest">
          + {depth} cm depth
        </p>
      )}
    </div>
  );
}
