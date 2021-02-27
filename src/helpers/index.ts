import config from '../config.json'

const screen = {
  size: {
    x: config.width,
    y: config.height
  }
}

export function checkBoundsCollide(obj, boundBox = screen) {
  return obj.pos.x >= 0 && obj.pos.x <= boundBox.size.x && obj.pos.y >= 0 && obj.pos.y <= boundBox.size.y
}
