import React, { useRef, useEffect, useState } from "react";
import { Processor } from "./chroma";
import DearImage from "dear-image";
import "dear-image.detect-background-color";
import "./index.css";
export const BackgroundDetector = () => {
  let videoElem = useRef(null);
  let videoCanvas = useRef(null);
  let compositeCanvas = useRef(null);
  const [color, setColor] = useState("");
  const startCamera = async () => {
    let track;
    await navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })
      .then((mediaStream) => {
        track = mediaStream.getVideoTracks()[0];
        if (videoElem) {
          videoElem.current.srcObject = mediaStream;
        }
      });
    const imageCapture = new ImageCapture(track);
    imageCapture.takePhoto().then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        DearImage.detectBackgroundColor(base64data).then((res) => {
          console.log(res, "response");
          setColor(res);
        });
      };
    });
  };
  useEffect(() => {
    const newChroma = { chromaKey: color, chromaLevel: 170 };
    new Processor(
      videoElem.current,
      videoCanvas.current,
      compositeCanvas.current,
      newChroma
    );
  }, [color]);
  useEffect(() => {
    startCamera();
    const ref = videoElem.current;
    return () => {
      if (ref.srcObject) {
        ref.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);
  return (
    <>
      <div class="row">
        <div class="col-md-6">
          <div class="block-rounded block-transparent block">
            <div class="block-header">
              <h3 class="block-title">Original Camera Stream</h3>
            </div>
            <div class="block-content">
              <video
                ref={videoElem}
                className="consultant-video"
                id="vid"
                autoPlay
                muted
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="block-rounded block-transparent block">
            <div class="block-header">
              <h3 class="block-title">Resulten Camera Stream</h3>
              <canvas ref={videoCanvas} style={{ display: "none" }} />
              <canvas
                className="chroma-merged-consultant-video"
                ref={compositeCanvas}
              />
            </div>
          </div>
        </div>
      </div>
      {color && (
        <div class="block-content color-text">
          <p>
            Your background color is{" "}
            <input type="color" value={color} disabled />{" "}
          </p>
        </div>
      )}
    </>
  );
};
