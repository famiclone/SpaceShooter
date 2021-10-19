import { RGBAToHEX } from '../helpers/index.js';
import { LevelImgMap, SpriteSheetProps } from '../types.js';
import { Vector2D } from './Vector.js';

interface LevelProps {
  tileSet: SpriteSheetProps;
  map: number[][];

  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  parseImage: (image: ImageBitmap) => number[][];
}
export class Level implements LevelProps {
  map: number[][];
  tileSet: SpriteSheetProps;
  pos: Vector2D;
  size: Vector2D;
  width: number;
  height: number;

  constructor(tileSet: SpriteSheetProps, levelImage: ImageBitmap) {
    this.tileSet = tileSet;
    this.map = this.parseImage(levelImage);

    this.pos = new Vector2D(0, 0);
    this.size = new Vector2D(16, 16);
    this.width = this.size.x * 16;
    this.height = this.size.y * 16;
  }

  update() {}

  parseImage(image: ImageBitmap): number[][] {
    const canvas = document.createElement('canvas');

    const dataMap = [];

    const imageWidth: number = image.width;
    const imageHeight: number = image.height;

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

    for (let y = 0; y < imageHeight; y++) {
      const arr = [];
      for (let x = 0; x < imageWidth; x++) {
        const pixel: Uint8ClampedArray = ctx.getImageData(x, y, 1, 1).data;
        // @ts-ignore
        arr.push(LevelImgMap[RGBAToHEX(pixel[0], pixel[1], pixel[2])]);
      }
      dataMap.push(arr);
    }

    return dataMap;
  }

  private getPosition(name: number): Vector2D {
    const el = this.tileSet.sheet[name] || [-16, 0];
    // @ts-ignore
    return new Vector2D(el[0], el[1]);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.tileSet.sheet.map((x, i) => {
      // @ts-ignore
      x.map((y, j) => {
        const pos = this.getPosition(y);

        ctx.drawImage(
          this.tileSet.image,
          pos.x,
          pos.y,
          this.size.x,
          this.size.y,
          this.pos.x + this.size.x * j,
          this.pos.y + this.size.y * i,
          this.size.x,
          this.size.y,
        );
      });
    });
  }
}
