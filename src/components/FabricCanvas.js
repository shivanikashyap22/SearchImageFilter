import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";

const FabricCanvas = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas);
    return () => {
      newCanvas.dispose();
    };
  }, []);

  const addText = () => {
    if (canvas) {
      const text = new fabric.Textbox("Sample Text", {
        left: 50,
        top: 50,
        fill: "black",
      });
      canvas.add(text);
    }
  };

  const addShape = (shapeType) => {
    if (canvas) {
      let shape;
      switch (shapeType) {
        case "circle":
          shape = new fabric.Circle({
            radius: 50,
            fill: "transparent",
            stroke: "black",
            left: 100,
            top: 100,
          });
          break;
        case "triangle":
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: "transparent",
            stroke: "black",
            left: 150,
            top: 150,
          });
          break;
        case "rectangle":
          shape = new fabric.Rect({
            width: 100,
            height: 50,
            fill: "transparent",
            stroke: "black",
            left: 200,
            top: 200,
          });
          break;
        case "polygon":
          shape = new fabric.Polygon(
            [
              { x: 0, y: 0 },
              { x: 50, y: 0 },
              { x: 50, y: 50 },
              { x: 0, y: 50 },
            ],
            {
              fill: "transparent",
              stroke: "black",
              left: 250,
              top: 250,
            }
          );
          break;
        default:
          break;
      }
      canvas.add(shape);
    }
  };

  const downloadImage = () => {
    if (canvas) {
      const imageUrl = canvas.toDataURL({
        format: "png",
        quality: 0.8,
      });
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "edited_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      <button onClick={addText}>Add Text</button>
      <button onClick={() => addShape("circle")}>Add Circle</button>
      <button onClick={() => addShape("triangle")}>Add Triangle</button>
      <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
      <button onClick={() => addShape("polygon")}>Add Polygon</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
};

export default FabricCanvas;
