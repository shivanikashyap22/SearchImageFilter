import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useLocation } from 'react-router-dom';
import * as Styled from "./style";

const CanvasPage = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const imageUrl = params.get('imageUrl');

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasElement = canvasRef.current;
    const canvas = new fabric.Canvas(canvasElement);
    canvasElement.fabric = canvas;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const fabricImg = new fabric.Image(img);
  const container = canvasRef.current?.parentNode; 

  if (!container) {
    console.error("Canvas container is not found.");
    return;
  }

  const canvasWidth = container.clientWidth;
  const canvasHeight = container.clientHeight;
  const canvas = canvasRef.current?.fabric; 

  if (!canvas) {
    console.error("Fabric canvas instance is not properly created.");
    return;
  }
      canvas?.setWidth(canvasWidth);
      canvas?.setHeight(canvasHeight);

      const scaleFactor = Math.min(canvasWidth / fabricImg?.width, canvasHeight / fabricImg?.height);
      fabricImg.scale(scaleFactor);

      fabricImg.set({
        left: (canvasWidth - fabricImg.getScaledWidth()) / 2,
        top: (canvasHeight - fabricImg.getScaledHeight()) / 2,
      });

      canvas.add(fabricImg);
      canvas.sendToBack(fabricImg);
      canvas.renderAll();
    };

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [imageUrl]);

  const addText = () => {
    const canvas = canvasRef.current?.fabric;
    if (canvas) {
      const text = new fabric.Textbox('Sample Text', {
        left: 50,
        top: 50,
        fill: 'black',
        editable: true,
      });
      canvas.add(text).setActiveObject(text);
      canvas.renderAll();
    }
  };

  const addShape = (shapeType) => {
    const canvas = canvasRef.current?.fabric;
    if (canvas) {
      let shape;
      switch (shapeType) {
        case 'circle':
          shape = new fabric.Circle({
            radius: 50,
            fill: 'transparent',
            stroke: 'black',
            left: 100,
            top: 100,
          });
          break;
        case 'triangle':
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: 'black',
            left: 150,
            top: 150,
          });
          break;
        case 'rectangle':
          shape = new fabric.Rect({
            width: 100,
            height: 50,
            fill: 'transparent',
            stroke: 'black',
            left: 200,
            top: 200,
          });
          break;
        case 'polygon':
          shape = new fabric.Polygon(
            [
              { x: 0, y: 0 },
              { x: 50, y: 0 },
              { x: 50, y: 50 },
              { x: 0, y: 50 },
            ],
            {
              fill: 'transparent',
              stroke: 'black',
              left: 200,
              top: 200,
            }
          );
          break;
        default:
          break;
      }
      if (shape) {
        canvas.add(shape).setActiveObject(shape);
        canvas.renderAll();
      }
    }
  };

  const shapeImage = (shapeType) => {
    const canvas = canvasRef.current?.fabric;
    if (canvas) {
      const imgObj = canvas.getObjects('image')[0];
      if (imgObj) {
        let clipPath;
        switch (shapeType) {
          case 'circle':
            clipPath = new fabric.Circle({
              radius: Math.min(imgObj?.width, imgObj.height) / 2,
              originX: 'center',
              originY: 'center'
            });
            break;
          case 'rectangle':
            clipPath = new fabric.Rect({
              width: imgObj?.width,
              height: imgObj.height,
              originX: 'center',
              originY: 'center'
            });
            break;
          case 'triangle':
            clipPath = new fabric.Triangle({
              width: imgObj?.width,
              height: imgObj.height,
              originX: 'center',
              originY: 'center'
            });
            break;
          case 'polygon':
            clipPath = new fabric.Polygon(
              [
                { x: 0, y: 0 },
                { x: imgObj?.width / 2, y: 0 },
                { x: imgObj?.width / 2, y: imgObj.height / 2 },
                { x: 0, y: imgObj.height / 2 },
              ],
              {
                originX: 'center',
                originY: 'center'
              }
            );
            break;
          default:
            break;
        }
        if (clipPath) {
          imgObj.set({ clipPath });
          canvas.renderAll();
        }
      }
    }
  };

  const addCaption = () => {
    const canvas = canvasRef.current?.fabric;
    if (canvas) {
      const text = new fabric.Textbox('Add Caption Here', {
        left: 50,
        top: 50,
        fill: 'black',
        editable: true,
      });
      canvas.add(text).setActiveObject(text);
      canvas.renderAll();
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current?.fabric;
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas-image.png';
      link.click();
    }
  };

  return (
    <>
    <Styled.Heading>
    <h1 className="heading">Add Caption Page</h1>
    </Styled.Heading>
    <Styled.Container className="container">
     
      <Styled.CanvasWrapper>
        <div className='canvas'>
        <canvas ref={canvasRef} width={800} height={500}/>
        </div>
        <div className='wrapper'>
          <Styled.ButtonWrapper>
            <Styled.ActionButton onClick={() => shapeImage('circle')}>Shape as Circle</Styled.ActionButton>
            <Styled.ActionButton onClick={() => shapeImage('rectangle')}>Shape as Rectangle</Styled.ActionButton>
            <Styled.ActionButton onClick={() => shapeImage('triangle')}>Shape as Triangle</Styled.ActionButton>
            <Styled.ActionButton onClick={() => shapeImage('polygon')}>Shape as Polygon</Styled.ActionButton>
            <Styled.ActionButton onClick={addText}>Add Text</Styled.ActionButton>
            <Styled.ActionButton onClick={() => addShape('circle')}>Add Circle</Styled.ActionButton>
            <Styled.ActionButton onClick={() => addShape('triangle')}>Add Triangle</Styled.ActionButton>
            <Styled.ActionButton onClick={() => addShape('rectangle')}>Add Rectangle</Styled.ActionButton>
            <Styled.ActionButton onClick={() => addShape('polygon')}>Add Polygon</Styled.ActionButton>
            <Styled.ActionButton onClick={addCaption}>Add Caption</Styled.ActionButton>
            <Styled.ActionButton onClick={downloadImage}>Download</Styled.ActionButton>
          </Styled.ButtonWrapper>
        </div>
      </Styled.CanvasWrapper>
    </Styled.Container>
    </>
  );
};

export default CanvasPage;