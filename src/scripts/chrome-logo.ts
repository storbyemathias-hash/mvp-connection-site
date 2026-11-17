/**
 * 3D chrome MVP logo: real extruded geometry (not a spinning picture),
 * lit by a studio environment map. Loaded lazily only when scrolled near.
 */
import {
  ACESFilmicToneMapping, Color, DirectionalLight, ExtrudeGeometry, Group, Mesh,
  MeshPhysicalMaterial, Path, PerspectiveCamera, PMREMGenerator, PointLight, QuadraticBezierCurve,
  Scene, Shape, SRGBColorSpace, Vector2, WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CX, CY, R, STROKE, MERIDIAN_RX, LAT_TOP, LAT_BOT, LETTER_M, LETTER_V, P } from '../lib/logo';

const H = STROKE / 2;
// SVG is y-down; flip so the logo is upright. Center on the whole artwork.
const OX = 512, OY = 515;
const v = (x: number, y: number) => new Vector2(x - OX, OY - y);

function ellipseRing(rx: number, ry: number) {
  const s = new Shape();
  s.absellipse(CX - OX, OY - CY, rx + H, ry + H, 0, Math.PI * 2, false, 0);
  const hole = new Path();
  hole.absellipse(CX - OX, OY - CY, rx - H, ry - H, 0, Math.PI * 2, true, 0);
  s.holes.push(hole);
  return s;
}
function rect(x0: number, y0: number, x1: number, y1: number) {
  return new Shape([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)]);
}
function band(lat: { x0: number; x1: number; y: number; cy: number }) {
  const c = new QuadraticBezierCurve(new Vector2(lat.x0, lat.y), new Vector2(CX, lat.cy), new Vector2(lat.x1, lat.y));
  const pts = c.getPoints(40);
  const top = pts.map((p) => v(p.x, p.y - H));
  const bot = pts.map((p) => v(p.x, p.y + H)).reverse();
  return new Shape([...top, ...bot]);
}
function letterP() {
  const s = new Shape();
  s.moveTo(P.x0 - OX, OY - P.bottom);
  s.lineTo(P.x0 - OX, OY - P.top);
  s.lineTo(P.bowlX - OX, OY - P.top);
  const rOut = (P.bowlBottom - P.top) / 2;
  s.absarc(P.bowlX - OX, OY - (P.top + rOut), rOut, Math.PI / 2, -Math.PI / 2, true);
  s.lineTo(P.x1 - OX, OY - P.bowlBottom);
  s.lineTo(P.x1 - OX, OY - P.bottom);
  s.closePath();
  const rIn = (P.holeBottom - P.holeTop) / 2;
  const hole = new Path();
  hole.moveTo(P.x1 - OX, OY - P.holeTop);
  hole.lineTo(P.bowlX - OX, OY - P.holeTop);
  hole.absarc(P.bowlX - OX, OY - (P.holeTop + rIn), rIn, Math.PI / 2, -Math.PI / 2, true);
  hole.lineTo(P.x1 - OX, OY - P.holeBottom);
  hole.closePath();
  s.holes.push(hole);
  return s;
}

export function mountChromeLogo(canvas: HTMLCanvasElement, opts: { reduceMotion: boolean }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;

  const camera = new PerspectiveCamera(30, 1, 10, 5000);
  camera.position.set(0, 0, 1500);

  const shapes: Shape[] = [
    ellipseRing(R, R),
    ellipseRing(MERIDIAN_RX, R),
    rect(CX - H, CY - R, CX + H, CY + R),
    rect(CX - R, CY - H, CX + R, CY + H),
    band(LAT_TOP),
    band(LAT_BOT),
    new Shape(LETTER_M.map(([x, y]) => v(x, y))),
    new Shape(LETTER_V.map(([x, y]) => v(x, y))),
    letterP(),
  ];
  const geo = new ExtrudeGeometry(shapes, {
    depth: 38, bevelEnabled: true, bevelThickness: 5, bevelSize: 3.2, bevelSegments: 3, curveSegments: 40,
  });
  geo.translate(0, 0, -19);

  const mat = new MeshPhysicalMaterial({
    color: new Color('#d7dbe0'), metalness: 1, roughness: 0.2, clearcoat: 0.6, clearcoatRoughness: 0.15,
  });
  const logo = new Group();
  logo.add(new Mesh(geo, mat));
  scene.add(logo);

  const key = new DirectionalLight('#ffffff', 1.4); key.position.set(400, 600, 800); scene.add(key);
  // Neutral rim lights only: the site is greyscale, so the chrome stays silver.
  const rim = new PointLight('#e8ecf2', 2.2, 0, 0); rim.position.set(-500, -350, 300); scene.add(rim);
  const back = new PointLight('#ffffff', 1.4, 0, 0); back.position.set(600, -200, -400); scene.add(back);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Fit the ~650-unit-tall artwork with some breathing room.
    const fitH = 820, fitW = fitH * 0.85;
    const dist = Math.max(fitH / 2 / Math.tan((camera.fov * Math.PI) / 360), fitW / 2 / Math.tan((camera.fov * Math.PI) / 360) / camera.aspect);
    camera.position.z = dist;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  // Spin: a slow turntable with a "settle" toward the front every turn, plus drag with inertia.
  let angle = -0.6, velocity = 0, dragging = false, lastX = 0, tiltX = 0, tiltTarget = 0;
  // 0.3877 rad/s base → one full turn takes ~20.3 s (was ~14.3 s at 0.55).
  const auto = opts.reduceMotion ? 0 : 0.3877;
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    tiltTarget = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    velocity = dx * 0.012; angle += velocity;
  });
  const end = () => { dragging = false; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', () => { tiltTarget = 0; });

  let visible = true, raf = 0, last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!dragging) {
      velocity *= Math.pow(0.04, dt);
      // Ease the speed so it lingers when facing the viewer, sweeps past the edge.
      const facing = Math.cos(angle);
      angle += velocity + auto * dt * (0.55 + 0.9 * (1 - Math.abs(facing)));
    }
    tiltX += (tiltTarget - tiltX) * 0.06;
    logo.rotation.set(tiltX + Math.sin(now / 2400) * 0.04, angle, 0);
    renderer.render(scene, camera);
    raf = visible && !opts.reduceMotion ? requestAnimationFrame(frame) : 0;
  };
  if (opts.reduceMotion) { logo.rotation.y = -0.45; renderer.render(scene, camera); }
  else raf = requestAnimationFrame(frame);

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf && !opts.reduceMotion) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }).observe(canvas);
}
