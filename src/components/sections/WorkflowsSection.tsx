import React from 'react';
import { FeatureDescription, FeatureHeader, FeatureSection, FeatureTitle } from './FeatureSection';

const EMERALD = '#10b981';
const BLUE = '#60a5fa';

// Layout constants shared by both diagrams
const NW = 112; // node width
const NH = 36; // node height
const NR = 7; // node border radius
const GAP = 32; // horizontal gap between nodes / groups

// Caret-style arrowhead: two lines forming a ">"
const Caret: React.FC<{ x: number; y: number; color: string; size?: number }> = ({ x, y, color, size = 4 }) => (
  <g>
    <line
      x1={x - size}
      y1={y - size}
      x2={x}
      y2={y}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <line
      x1={x - size}
      y1={y + size}
      x2={x}
      y2={y}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
  </g>
);

// A horizontal flow edge: track line + caret at end + travelling dot
const HEdge: React.FC<{
  id: string;
  x1: number;
  x2: number;
  y: number;
  color: string;
  dur?: number;
  begin?: number;
}> = ({ x1, x2, y, color, dur = 3.2, begin = 0 }) => {
  const caretX = x2 - 2; // caret tip just before x2
  return (
    <g>
      {/* Track */}
      <line x1={x1} y1={y} x2={caretX} y2={y} stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      {/* Caret arrowhead */}
      <Caret x={caretX} y={y} color={color} />
      {/* Travelling dot */}
      <circle r="1.9" fill={color}>
        <animateMotion
          dur={`${dur}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
          calcMode="linear"
          path={`M ${x1} ${y} L ${x2 - 10} ${y}`}
        />
        <animate
          attributeName="opacity"
          dur={`${dur}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
          values="0;0.9;0.9;0"
          keyTimes="0;0.05;0.8;1"
          calcMode="linear"
        />
      </circle>
    </g>
  );
};

// Branch edge: line goes right then splits up and down to two targets
const BranchEdge: React.FC<{
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toYTop: number;
  toYBot: number;
  color: string;
}> = ({ fromX, fromY, toX, toYTop, toYBot, color }) => {
  const pivotX = fromX + (toX - fromX) * 0.45;
  return (
    <g>
      {/* Horizontal stem */}
      <line x1={fromX} y1={fromY} x2={pivotX} y2={fromY} stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      {/* Vertical spine */}
      <line x1={pivotX} y1={toYTop} x2={pivotX} y2={toYBot} stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      {/* Top branch */}
      <line x1={pivotX} y1={toYTop} x2={toX - 2} y2={toYTop} stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <Caret x={toX - 2} y={toYTop} color={color} />
      {/* Bottom branch */}
      <line x1={pivotX} y1={toYBot} x2={toX - 2} y2={toYBot} stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <Caret x={toX - 2} y={toYBot} color={color} />

      {/* Dot → top */}
      <circle r="1.9" fill={color}>
        <animateMotion
          dur="3.6s"
          begin="0s"
          repeatCount="indefinite"
          calcMode="linear"
          path={`M ${fromX} ${fromY} L ${pivotX} ${fromY} L ${pivotX} ${toYTop} L ${toX - 10} ${toYTop}`}
        />
        <animate
          attributeName="opacity"
          dur="3.6s"
          begin="0s"
          repeatCount="indefinite"
          values="0;0.9;0.9;0"
          keyTimes="0;0.05;0.85;1"
          calcMode="linear"
        />
      </circle>
      {/* Dot → bottom */}
      <circle r="1.9" fill={color}>
        <animateMotion
          dur="3.6s"
          begin="1.8s"
          repeatCount="indefinite"
          calcMode="linear"
          path={`M ${fromX} ${fromY} L ${pivotX} ${fromY} L ${pivotX} ${toYBot} L ${toX - 10} ${toYBot}`}
        />
        <animate
          attributeName="opacity"
          dur="3.6s"
          begin="1.8s"
          repeatCount="indefinite"
          values="0;0.9;0.9;0"
          keyTimes="0;0.05;0.85;1"
          calcMode="linear"
        />
      </circle>
    </g>
  );
};

const Node: React.FC<{ x: number; y: number; label: string; color: string }> = ({ x, y, label, color }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={NW}
      height={NH}
      rx={NR}
      fill={`${color}15`}
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.55"
      style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
    />
    <text
      x={x + NW / 2}
      y={y + NH / 2 + 4}
      textAnchor="middle"
      fill="#e5e7eb"
      fontSize="10.5"
      fontWeight="600"
      fontFamily="ui-monospace, monospace"
      letterSpacing="0.3"
    >
      {label}
    </text>
  </g>
);

const GroupBox: React.FC<{ x: number; y: number; w: number; h: number; label: string; color: string }> = ({
  x,
  y,
  w,
  h,
  label,
  color,
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="10"
      fill={`${color}07`}
      stroke={color}
      strokeWidth="1"
      strokeOpacity="0.3"
      strokeDasharray="5 4"
    />
    <text
      x={x + w / 2}
      y={y + 13}
      textAnchor="middle"
      fill={color}
      fontSize="8"
      fontWeight="700"
      fontFamily="ui-monospace, monospace"
      letterSpacing="2.5"
      fillOpacity="0.65"
    >
      {label}
    </text>
  </g>
);

// ─── DEFAULT CLOUD ────────────────────────────────────────────────────────────
const DefaultCloudDiagram: React.FC = () => {
  // Two input nodes centred vertically, group with 2 stacked nodes on the right
  const innerRowGap = 16; // gap between the two rows inside the group
  const groupPad = { t: 22, b: 10, l: 10, r: 10 }; // padding inside group box

  // Inner nodes (col2 = left col inside group, col3 = right col inside group)
  const groupInnerW = NW + GAP + NW + groupPad.l + groupPad.r;
  const groupH = groupPad.t + NH + innerRowGap + NH + groupPad.b;

  // Vertically: centre the two rows, derive their Y
  const totalInnerH = NH + innerRowGap + NH;
  const svgH = groupPad.t + totalInnerH + groupPad.b + 8; // a little breathing room
  const row0Y = groupPad.t + 4; // top row y inside svg
  const row1Y = row0Y + NH + innerRowGap; // bottom row y inside svg

  const midY = (row0Y + NH / 2 + row1Y + NH / 2) / 2; // vertical midpoint

  // X positions
  const col0 = 4;
  const col1 = col0 + NW + GAP;
  const groupX = col1 + NW + GAP;
  const col2 = groupX + groupPad.l;
  const col3 = col2 + NW + GAP;
  const svgW = col3 + NW + groupPad.r + 4;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
      <GroupBox x={groupX} y={2} w={groupInnerW} h={groupH} label="ZEPHYR INFRASTRUCTURE" color={EMERALD} />

      <Node x={col0} y={midY - NH / 2} label="Developer" color={EMERALD} />
      <Node x={col1} y={midY - NH / 2} label="Zephyr Plugin" color={EMERALD} />
      <Node x={col2} y={row0Y} label="Worker Gateway" color={EMERALD} />
      <Node x={col3} y={row0Y} label="Build ID Gen" color={EMERALD} />
      <Node x={col2} y={row1Y} label="Zephyr Worker" color={EMERALD} />
      <Node x={col3} y={row1Y} label="Edge Datastores" color={EMERALD} />

      <HEdge id="dc-dev" x1={col0 + NW} x2={col1} y={midY} color={EMERALD} dur={2.8} begin={0} />

      <BranchEdge
        id="dc-branch"
        color={EMERALD}
        fromX={col1 + NW}
        fromY={midY}
        toX={col2}
        toYTop={row0Y + NH / 2}
        toYBot={row1Y + NH / 2}
      />

      <HEdge id="dc-wg" x1={col2 + NW} x2={col3} y={row0Y + NH / 2} color={EMERALD} dur={2.8} begin={0.8} />
      <HEdge id="dc-zw" x1={col2 + NW} x2={col3} y={row1Y + NH / 2} color={EMERALD} dur={2.8} begin={2.0} />
    </svg>
  );
};

// ─── BYOC ─────────────────────────────────────────────────────────────────────
const ByocDiagram: React.FC = () => {
  const groupPad = { t: 22, b: 10, l: 10, r: 10 };
  const groupGap = 20; // vertical gap between the two group boxes

  // Each group wraps one row
  const groupW = NW + GAP + NW + groupPad.l + groupPad.r;
  const groupH = groupPad.t + NH + groupPad.b;

  const row0Y = groupPad.t + 4; // top row inside its group
  const group0Y = row0Y - groupPad.t; // top group box y = 0+offset
  const group1Y = group0Y + groupH + groupGap; // bottom group box y
  const row1Y = group1Y + groupPad.t; // bottom row y inside its group

  const midY = (row0Y + NH / 2 + row1Y + NH / 2) / 2;

  const col0 = 4;
  const col1 = col0 + NW + GAP;
  const groupX = col1 + NW + GAP;
  const col2 = groupX + groupPad.l;
  const col3 = col2 + NW + GAP;
  const svgW = col3 + NW + groupPad.r + 4;
  const svgH = group1Y + groupH + 8;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
      <GroupBox x={groupX} y={group0Y + 2} w={groupW} h={groupH} label="ZEPHYR INFRASTRUCTURE" color={EMERALD} />
      <GroupBox x={groupX} y={group1Y + 2} w={groupW} h={groupH} label="USER INFRASTRUCTURE" color={BLUE} />

      <Node x={col0} y={midY - NH / 2} label="Developer" color={EMERALD} />
      <Node x={col1} y={midY - NH / 2} label="Zephyr Plugin" color={EMERALD} />
      <Node x={col2} y={row0Y} label="Worker Gateway" color={EMERALD} />
      <Node x={col3} y={row0Y} label="Build ID Gen" color={EMERALD} />
      <Node x={col2} y={row1Y} label="Zephyr Worker" color={BLUE} />
      <Node x={col3} y={row1Y} label="Edge Datastores" color={BLUE} />

      <HEdge id="byoc-dev" x1={col0 + NW} x2={col1} y={midY} color={EMERALD} dur={2.8} begin={0} />

      <BranchEdge
        id="byoc-branch"
        color={EMERALD}
        fromX={col1 + NW}
        fromY={midY}
        toX={col2}
        toYTop={row0Y + NH / 2}
        toYBot={row1Y + NH / 2}
      />

      <HEdge id="byoc-wg" x1={col2 + NW} x2={col3} y={row0Y + NH / 2} color={EMERALD} dur={2.8} begin={0.8} />
      <HEdge id="byoc-zw" x1={col2 + NW} x2={col3} y={row1Y + NH / 2} color={BLUE} dur={2.8} begin={2.0} />
    </svg>
  );
};

// ─── Frame + layout ───────────────────────────────────────────────────────────
const DiagramFrame: React.FC<{ title: string; children: React.ReactNode; accent: string }> = ({
  title,
  children,
  accent,
}) => (
  <div
    className="border rounded-2xl p-5 flex flex-col gap-3 relative flex-1"
    style={{
      borderColor: `${accent}35`,
      background: `radial-gradient(ellipse at 50% 0%, ${accent}0a 0%, transparent 65%)`,
      boxShadow: `0 0 40px ${accent}12, inset 0 1px 0 ${accent}18`,
    }}
  >
    <h4 className="text-xs font-mono tracking-widest text-center" style={{ color: accent }}>
      {title}
    </h4>
    {children}
  </div>
);

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex-1 mt-1">
    <p className="text-lg text-primary">{title}</p>
    <p className="text-base text-muted-foreground mt-1">{description}</p>
  </div>
);

const FeatureWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col md:flex-row gap-6 items-center">{children}</div>
);

export const WorkflowsSection: React.FC = () => (
  <FeatureSection hasGradient={true} className="workFlows">
    <FeatureHeader>
      <FeatureTitle>Workflows</FeatureTitle>
      <FeatureDescription>
        With Zephyr you are in control of where you deploy.
        <br />
        Choose between bring your own cloud or use our built in one.
      </FeatureDescription>
    </FeatureHeader>

    <div className="flex flex-col gap-12 md:gap-6">
      <FeatureWrapper>
        <DiagramFrame title="DEFAULT INTEGRATION" accent={EMERALD}>
          <DefaultCloudDiagram />
        </DiagramFrame>
        <FeatureCard
          title="Default Cloud"
          description="Powered by the largest CDNs in the world our built in cloud integration provides the fastest way to get started."
        />
      </FeatureWrapper>

      <FeatureWrapper>
        <DiagramFrame title="BYOC INTEGRATION" accent={BLUE}>
          <ByocDiagram />
        </DiagramFrame>
        <FeatureCard
          title="Bring Your Own Cloud (BYOC)"
          description="Your cloud your choice, with Zephyr you can easily bring your own cloud, switch clouds, and deploy to multiple clouds at once, all with a few clicks."
        />
      </FeatureWrapper>
    </div>
  </FeatureSection>
);
