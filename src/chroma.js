export class Processor {
    constructor(videoRef, videoCanvas, compositeCanvas, chroma) {
      this.video = videoRef;
      this.chroma = { ckLevelValue: chroma.chromaLevel };
      this.color = {
        r: parseInt(chroma.chromaKey.slice(1, 3), 16),
        g: parseInt(chroma.chromaKey.slice(3, 5), 16),
        b: parseInt(chroma.chromaKey.slice(5, 7), 16),
      };
      this.videoCanvas = videoCanvas;
      this.videoCanvasCtx = videoCanvas.getContext('2d');
      this.compositeCanvas = compositeCanvas;
      this.compositeCanvasCtx = compositeCanvas.getContext('2d');
      this.height = this.videoCanvasCtx.canvas.height;
      this.width = this.videoCanvasCtx.canvas.width;
      this._timerCallback();
    }
  
    updateChromaValues(chroma) {
      this.chroma = { ckLevelValue: chroma.chromaLevel };
      this.color = {
        r: parseInt(chroma.chromaKey.slice(1, 3), 16),
        g: parseInt(chroma.chromaKey.slice(3, 5), 16),
        b: parseInt(chroma.chromaKey.slice(5, 7), 16),
      };
    }
  
    _computeFrame() {
      this.videoCanvasCtx.drawImage(this.video, 0, 0, this.width, this.height);
      let frame = this.videoCanvasCtx.getImageData(0, 0, this.width, this.height);
  
      const OFFSET = 4;
      const RED_INDEX = 0;
      const GREEN_INDEX = 1;
      const BLUE_INDEX = 2;
      const ALPHA_INDEX = 3;
  
      const l = frame.data.length;
      for (let index = 0; index < l; index++) {
        const r = frame.data[index * OFFSET + RED_INDEX];
        const g = frame.data[index * OFFSET + GREEN_INDEX];
        const b = frame.data[index * OFFSET + BLUE_INDEX];
  
        if (
          Math.abs(r - this.color.r) < 250 - this.chroma.ckLevelValue &&
          Math.abs(g - this.color.g) < 250 - this.chroma.ckLevelValue &&
          Math.abs(b - this.color.b) < 250 - this.chroma.ckLevelValue
        ) {
          frame.data[index * OFFSET + ALPHA_INDEX] = 0;
        }
      }
      this.compositeCanvasCtx.putImageData(frame, 0, 0);
    }
  
    _timerCallback() {
      if (this.video.paused || this.video.ended) {
        // console.log(`video paused or ended`);
        return;
      }
      this._computeFrame();
      const self = this;
      const renderFunction = () => {
        self._timerCallback();
      };
      setTimeout(renderFunction, 0);
    }
  
    start() {}
  }
  