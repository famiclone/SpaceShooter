import { config } from '../config.js';
const screen = {
    size: {
        x: config.width,
        y: config.height,
    },
};
export function checkBoundsCollide(obj, boundBox = screen) {
    return (obj.pos.x >= 0 &&
        obj.pos.x <= boundBox.size.x &&
        obj.pos.y >= 0 &&
        obj.pos.y <= boundBox.size.y);
}
export function RGBAToHEX(r = 0, g = 0, b = 0, a = 1) {
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);
    if (rHex.length === 1) {
        rHex = `0${r}`;
    }
    if (gHex.length === 1) {
        gHex = `0${g}`;
    }
    if (bHex.length === 1) {
        bHex = `0${b}`;
    }
    return `#${rHex}${gHex}${bHex}`;
}
// export const assets = {
//   toLoad: 0,
//   loaded: 0,
//   imageExtensions: ['png'],
//   jsonExtensions: ['json'],
//   audioExtensions: ['mp3', 'ogg', 'wav'],
//   load(sources) {
//     return new Promise((resolve) => {
//       let loadHandler = () => {
//         this.loaded += 1
//         console.log(this.loaded)
//         if (this.loLoad === this.loaded) {
//           this.loaded = 0
//           this.toLoad = 0
//           console.log('Assets finished loading.')
//           resolve()
//         }
//       }
//       console.log('Loading assets...')
//       this.toLoad = sources.length
//       sources.forEach((source: string) => {
//         let extension = source.split('.').pop()
//         if (this.imageExtensions.indexOf(extension) !== -1) {
//           this.loadImage(source, loadHandler)
//         } else if (this.jsonExtensions.indexOf(extension) !== -1) {
//           this.loadJson(source, loadHandler)
//         } else if (this.audioExtensions.indexOf(extension) !== -1) {
//           this.loadAudio(source, loadHandler)
//         } else {
//           console.log(`File type: ${source} is not valid.`)
//         }
//       })
//     })
//   },
//   loadImage(source, loadHandler) {
//     let image = new Image()
//     image.addEventListener('load', loadHandler, false)
//     this[source] = image
//     image.src = source
//   },
//   async loadJson(source, loadHandler) {
//     const response = await fetch(new Response(source))
//     const data = await response.text()
//     console.log(data, source)
//   }
// }
