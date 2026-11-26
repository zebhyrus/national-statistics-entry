// Canvas chart helpers for NusaStat. Plain canvas, no library.
// drawBarChart and drawLineChart take a canvas element, labels, values
// and a unit string, and render a labelled chart that stays readable
// on desktop and on a phone.
const INK = "#12263a";
const MUTED = "#5b6b7c";
const GRID = "#e3e9ef";
const TEAL = "#0e7c6b";
const AMBER = "#d99000";
const RED = "#c0392b";
const BLUE = "#1f6fb2";

export function fitCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(280, Math.round(rect.width));
  const h = Math.round(canvas.dataset.height || 240);
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, w, h };
}

function niceMax(values) {
  const top = Math.max(...values);
  const low = Math.min(...values);
  const span = top - low;
  const pad = span === 0 ? Math.abs(top) * 0.2 + 1 : span * 0.15;
  return { top: top + pad, low: Math.min(0, low - pad) };
}

function axes(ctx, w, h, pad, low, top, unit) {
  ctx.clearRect(0, 0, w, h);
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = MUTED;
  ctx.textAlign = "left";
  ctx.fillText(unit, pad.left, 16);
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = low + ((top - low) * i) / 4;
    const y = pad.top + ((top - v) / (top - low)) * (h - pad.top - pad.bottom);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillStyle = MUTED;
    ctx.fillText(formatTick(v), 4, y + 4);
  }
}

function formatTick(v) {
  if (Math.abs(v) >= 100) return String(Math.round(v));
  if (Math.abs(v) >= 10) return v.toFixed(1);
  return v.toFixed(2).replace(/0$/, "");
}

export function drawBarChart(canvas, labels, values, unit, color) {
  const { ctx, w, h } = fitCanvas(canvas);
  const pad = { left: 46, right: 12, top: 26, bottom: 30 };
  const { top, low } = niceMax(values);
  axes(ctx, w, h, pad, low, top, unit);
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const slot = innerW / values.length;
  const barW = Math.min(56, slot * 0.62);
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "center";
  values.forEach((v, i) => {
    const x = pad.left + slot * i + (slot - barW) / 2;
    const y = pad.top + ((top - v) / (top - low)) * innerH;
    const base = pad.top + ((top - Math.max(low, 0)) / (top - low)) * innerH;
    ctx.fillStyle = v < 0 ? RED : (color || TEAL);
    ctx.beginPath();
    ctx.roundRect(x, Math.min(y, base), barW, Math.abs(base - y) || 2, 3);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.fillText(String(v), x + barW / 2, y - 6 < pad.top ? pad.top + 10 : y - 6);
    ctx.fillStyle = MUTED;
    ctx.fillText(labels[i], x + barW / 2, h - 10);
  });
}

export function drawLineChart(canvas, labels, values, unit, color) {
  const { ctx, w, h } = fitCanvas(canvas);
  const pad = { left: 46, right: 16, top: 26, bottom: 30 };
  const { top, low } = niceMax(values);
  axes(ctx, w, h, pad, low, top, unit);
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const point = (i) => ({
    x: pad.left + (innerW * i) / (values.length - 1),
    y: pad.top + ((top - values[i]) / (top - low)) * innerH
  });
  ctx.strokeStyle = color || BLUE;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  values.forEach((v, i) => {
    const p = point(i);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "center";
  values.forEach((v, i) => {
    const p = point(i);
    ctx.fillStyle = color || BLUE;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.fillText(String(v), p.x, p.y - 10);
    ctx.fillStyle = MUTED;
    ctx.fillText(labels[i], p.x, h - 10);
  });
}

export function drawHBarChart(canvas, labels, values, unit) {
  const { ctx, w, h } = fitCanvas(canvas);
  const pad = { left: 130, right: 54, top: 26, bottom: 14 };
  const top = Math.max(...values) * 1.12;
  ctx.clearRect(0, 0, w, h);
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = MUTED;
  ctx.textAlign = "left";
  ctx.fillText(unit, pad.left, 16);
  const innerW = w - pad.left - pad.right;
  const slot = (h - pad.top - pad.bottom) / values.length;
  const barH = Math.min(22, slot * 0.6);
  values.forEach((v, i) => {
    const y = pad.top + slot * i + (slot - barH) / 2;
    ctx.fillStyle = TEAL;
    ctx.beginPath();
    ctx.roundRect(pad.left, y, (v / top) * innerW, barH, 3);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = "left";
    ctx.fillText(String(v), pad.left + (v / top) * innerW + 6, y + barH / 2 + 4);
    ctx.fillStyle = INK;
    ctx.textAlign = "right";
    ctx.fillText(labels[i], pad.left - 8, y + barH / 2 + 4);
  });
}

export { TEAL, AMBER, BLUE, RED };
