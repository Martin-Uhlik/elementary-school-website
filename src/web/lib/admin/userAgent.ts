// A short "Chrome 141 · Windows" for the logs; the full user agent is shown on hover
const BROWSERS: [string, RegExp][] = [
  ["Edge", /Edg(?:e|A|iOS)?\/(\d+)/],
  ["Opera", /OPR\/(\d+)/],
  ["Firefox", /(?:Firefox|FxiOS)\/(\d+)/],
  ["Chrome", /(?:Chrome|CriOS)\/(\d+)/],
  ["Safari", /Version\/(\d+).*Safari/],
];

const SYSTEMS: [string, RegExp][] = [
  ["Android", /Android/],
  ["iPhone", /iPhone/],
  ["iPad", /iPad/],
  ["Windows", /Windows/],
  ["macOS", /Mac OS X/],
  ["Linux", /Linux/],
];

export const describeAgent = (agent: string) => {
  if (!agent) return "neznámý";
  const browser = BROWSERS.map(([name, re]) => [name, agent.match(re)?.[1]] as const).find(([, v]) => v);
  const system = SYSTEMS.find(([, re]) => re.test(agent))?.[0];
  return [browser && `${browser[0]} ${browser[1]}`, system].filter(Boolean).join(" · ") || agent.slice(0, 40);
};
