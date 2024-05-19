import { type Coord, mouseButtons } from "../values";

export function drawMouseButton(
  context: CanvasRenderingContext2D,
  pos: Coord,
  buttons: mouseButtons
) {
  const rad = pos[2] / 5 * 2;
  const l1 = [pos[0], pos[1] + pos[3]];
  const l2 = [pos[0], pos[1] + rad];
  const l3 = [pos[0] + rad, pos[1]];
  const l4 = [pos[0] + rad, pos[1] + rad];
  const l5 = [l4[0], l4[1] + pos[3] / 5];
  const l6 = [l4[0], l4[1] + pos[3] / 8];

  const r1 = [pos[0] + pos[2], pos[1] + pos[3]];
  const r2 = [pos[0] + pos[2], pos[1] + rad];
  const r3 = [pos[0] + pos[2] - rad, pos[1]];
  const r4 = [pos[0] + pos[2] - rad, pos[1] + rad];
  const r5 = [r4[0], r4[1] + pos[3] / 5];
  const r6 = [r4[0], r4[1] + pos[3] / 8];


  context.strokeStyle = "lightgray";
  context.fillStyle = "lightgray";
  context.beginPath();
  context.moveTo(l1[0], l1[1]);
  context.lineTo(l2[0], l2[1]);
  context.arc(l4[0], l4[1], rad, Math.PI / 2 * 2, Math.PI / 2 * 3);
  context.lineTo(l6[0], l6[1]);

  context.lineTo(r6[0], r6[1]);
  context.lineTo(r3[0], r3[1]);
  context.moveTo(l3[0], l3[1]);

  context.lineTo(r3[0], r3[1]);
  context.arc(r4[0], r4[1], rad, Math.PI / 2 * 3, Math.PI / 2 * 4);
  context.lineTo(r1[0], r1[1]);
  context.stroke();
  if ((buttons & mouseButtons.Left) === mouseButtons.Left) {
    context.beginPath();
    context.moveTo(l2[0], l2[1] + pos[3] / 5);
    context.lineTo(l2[0], l2[1]);
    context.arc(l4[0], l4[1], rad, Math.PI / 2 * 2, Math.PI / 2 * 3);
    context.lineTo(l5[0], l5[1]);
    context.fill();
  }
  if ((buttons & mouseButtons.Right) === mouseButtons.Right) {
    context.beginPath();
    context.moveTo(r5[0], r5[1]);
    context.lineTo(r3[0], r3[1]);
    context.arc(r4[0], r4[1], rad, Math.PI / 2 * 3, Math.PI / 2 * 4);
    context.lineTo(r2[0], r2[1] + pos[3] / 5);
    context.fill();
  }
  if ((buttons & mouseButtons.WheelUp) === mouseButtons.WheelUp) {
    context.beginPath();
    context.moveTo(l3[0], l3[1]);
    context.lineTo(r3[0], r3[1]);
    context.lineTo(r6[0], (r3[1] + r6[1]) / 2);
    context.lineTo(l6[0], (l3[1] + l6[1]) / 2);
    context.lineTo(l3[0], l3[1]);
    context.fill();
  }
  if ((buttons & mouseButtons.WheelDown) === mouseButtons.WheelDown) {
    context.beginPath();
    context.moveTo(l3[0], (r3[1] + r6[1]) / 2);
    context.lineTo(r3[0], (l3[1] + l6[1]) / 2);
    context.lineTo(r6[0], r6[1]);
    context.lineTo(l6[0], l6[1]);
    context.lineTo(l3[0], l3[1]);
    context.fill();
  }
}