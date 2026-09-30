// Stage geometry, in px, from the measured stage width. Two regimes: side by side with room for a
// shelf between the snapshots (wide), and two tight columns (phones). Everything the film moves is
// absolutely positioned from here, so a card can travel between frames on a spring.

export interface Point {
  x: number;
  y: number;
}

export interface Box extends Point {
  w: number;
  h: number;
}

export interface StageLayout {
  W: number;
  H: number;
  narrow: boolean;
  pad: number;
  /** Top of the chips that sit on the row above the frames (QA user, acceptance). */
  chipY: number;
  frameY: number;
  frameH: number;
  colW: number;
  leftX: number;
  rightX: number;
  rowH: number;
  /** Top of row `i` (0 = host) inside either frame. */
  rowY: (i: number) => number;
  /** Row x inside a frame whose left edge is `frameX`. */
  rowX: (frameX: number) => number;
  rowW: number;
  trackY: number;
  /** Track ends: under the previous snapshot and under the candidate. */
  x0: number;
  x1: number;
  stopX: (i: number) => number;
  lane: Box;
  stray: { w: number; shelf: Point; approach: Point };
  cold: {
    cardW: number;
    /** Where each remote waits before it meets the host (catalog, search, checkout). */
    spread: Point[];
    panel: Box;
    rowX: number;
    rowW: number;
    button: Box;
    cursorFrom: Point;
  };
}

export const HEADER_H = 42;
const FRAME_BOTTOM = 10;

/** Width assumed before the stage is measured: a phone, so the server layout never overflows. */
export const SSR_WIDTH = 343;
export const NARROW_BELOW = 600;

export function stageLayout(width: number): StageLayout {
  const W = Math.max(300, Math.round(width));
  const narrow = W < NARROW_BELOW;

  const pad = narrow ? 14 : 24;
  const frameY = narrow ? 70 : 78;
  const chipY = frameY - 40;
  const rowH = narrow ? 30 : 34;
  const rowGap = narrow ? 5 : 6;
  const frameH = HEADER_H + 4 * rowH + 3 * rowGap + FRAME_BOTTOM;
  const inner = W - pad * 2;

  const colW = narrow ? Math.floor((inner - 22) / 2) : Math.min(280, Math.max(184, Math.round(inner * 0.3)));
  const margin = narrow ? 0 : Math.round(inner * 0.035);
  const leftX = pad + margin;
  const rightX = W - pad - margin - colW;

  const rowY = (i: number) => frameY + HEADER_H + i * (rowH + rowGap);
  const rowX = (frameX: number) => frameX + 10;
  const rowW = colW - 20;

  const trackY = frameY + frameH + 40;
  const x0 = leftX + colW / 2;
  const x1 = rightX + colW / 2;
  const stopX = (i: number) => x0 + ((x1 - x0) * i) / 4;

  const laneY = trackY + 38;
  const H = narrow ? laneY + 150 : laneY + 92;
  const lane = { x: pad, y: laneY, w: inner, h: H - laneY - 10 };

  const gap = rightX - (leftX + colW);
  const strayW = narrow ? colW - 16 : Math.min(150, gap - 28);
  const stray = narrow
    ? {
        w: strayW,
        shelf: { x: pad, y: laneY + 8 },
        approach: { x: rightX + 8, y: frameY + frameH - 12 },
      }
    : {
        w: strayW,
        shelf: { x: leftX + colW + (gap - strayW) / 2, y: rowY(1) },
        approach: { x: rightX - strayW + 16, y: rowY(1) },
      };

  // Cold open: the assembled surface sits in the middle, a frame's width, with a button under its rows.
  const panelW = narrow ? Math.min(inner, 260) : colW + 24;
  const panel = { x: (W - panelW) / 2, y: frameY, w: panelW, h: frameH + rowH + 8 };
  const coldRowX = panel.x + 10;
  const coldRowW = panelW - 20;
  const button = { x: coldRowX, y: rowY(4), w: coldRowW, h: rowH - 4 };
  const cardW = narrow ? coldRowW : Math.min(214, Math.floor((inner - 56) / 3));
  const spread = narrow
    ? [1, 2, 3].map((i, k) => ({ x: coldRowX + (k % 2 === 0 ? -6 : 6), y: frameY + 18 + i * (rowH + 20) }))
    : [0, 1, 2].map((k) => ({ x: (W - (cardW * 3 + 56)) / 2 + k * (cardW + 28), y: frameY + 80 }));

  return {
    W,
    H,
    narrow,
    pad,
    chipY,
    frameY,
    frameH,
    colW,
    leftX,
    rightX,
    rowH,
    rowY,
    rowX,
    rowW,
    trackY,
    x0,
    x1,
    stopX,
    lane,
    stray,
    cold: {
      cardW,
      spread,
      panel,
      rowX: coldRowX,
      rowW: coldRowW,
      button,
      cursorFrom: { x: panel.x + panel.w + 28, y: panel.y + panel.h + 36 },
    },
  };
}
