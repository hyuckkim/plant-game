
export const drawSprite = (
  context: CanvasRenderingContext2D, 
  image: CanvasImageSource,
  render: [x: number, y: number, w: number, h: number],
  source: [x: number, y: number, w: number, h: number],
  flipped: { x: boolean, y: boolean } = { x: false, y: false },
  pos: { x: number, y: number } = { x: 0.5, y: 0.5 },
) => {
  context.save();
    context.imageSmoothingEnabled = false;
    context.scale(flipped.x ? -1 : 1, flipped.y ? -1 : 1);
    context.drawImage(
      image,
      source[0],
      source[1],
      source[2],
      source[3],
      render[0] * (flipped.x ? -1 : 1) - render[2] * pos.x,
      render[1] * (flipped.y ? -1 : 1) - render[3] * pos.y,
      render[2],
      render[3]
    );
    context.restore();
}