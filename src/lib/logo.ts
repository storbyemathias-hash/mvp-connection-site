/**
 * MVP logo geometry, traced from the supplied 1024x1024 artwork.
 * Shared by the SVG mark, the liquid-glass hero and the 3D chrome logo.
 */
export const CX = 512;
export const CY = 420;
export const R = 210; // globe stroke centerline
export const STROKE = 21;
export const MERIDIAN_RX = 123;

// Latitude curves (quadratic): endpoints sit inside the ring stroke.
export const LAT_TOP = { x0: 319, x1: 705, y: 332, cy: 358 };
export const LAT_BOT = { x0: 319, x1: 705, y: 509, cy: 483 };

/** Globe as stroked SVG paths (fill: none, stroke-width: STROKE). */
export const globePaths = [
  `M${CX - R} ${CY}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0`,
  `M${CX - MERIDIAN_RX} ${CY}a${MERIDIAN_RX} ${R} 0 1 0 ${2 * MERIDIAN_RX} 0a${MERIDIAN_RX} ${R} 0 1 0 ${-2 * MERIDIAN_RX} 0`,
  `M${CX} ${CY - R}V${CY + R}`,
  `M${CX - R} ${CY}H${CX + R}`,
  `M${LAT_TOP.x0} ${LAT_TOP.y}Q${CX} ${LAT_TOP.cy} ${LAT_TOP.x1} ${LAT_TOP.y}`,
  `M${LAT_BOT.x0} ${LAT_BOT.y}Q${CX} ${LAT_BOT.cy} ${LAT_BOT.x1} ${LAT_BOT.y}`,
];

/** Letter outlines as polygons (SVG coords, y down). P bowl is built separately. */
export const LETTER_M: [number, number][] = [
  [293, 822], [293, 700], [329, 700], [378, 770], [427, 700], [463, 700],
  [463, 822], [433, 822], [433, 745], [397, 797], [359, 797], [323, 745], [323, 822],
];
export const LETTER_V: [number, number][] = [
  [490, 700], [524, 700], [542, 778], [578, 700], [612, 700], [562, 822], [522, 822],
];
/** P: stem + bowl (outer radius 47.5, inner 17.5). */
export const P = { x0: 620, x1: 650, top: 700, bottom: 822, bowlX: 685, bowlBottom: 795, holeTop: 730, holeBottom: 765 };

export const lettersPath = [
  'M' + LETTER_M.map((p) => p.join(' ')).join('L') + 'Z',
  'M' + LETTER_V.map((p) => p.join(' ')).join('L') + 'Z',
  `M${P.x0} ${P.bottom}V${P.top}H${P.bowlX}A47.5 47.5 0 0 1 ${P.bowlX} ${P.bowlBottom}H${P.x1}V${P.bottom}Z` +
    `M${P.x1} ${P.holeTop}H${P.bowlX}A17.5 17.5 0 0 1 ${P.bowlX} ${P.holeBottom}H${P.x1}Z`,
].join('');

/** Tight viewBox around the artwork. */
export const VIEWBOX = '270 190 484 650';
export const GLOBE_VIEWBOX = '290 198 444 444';
