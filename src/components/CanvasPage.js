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
    if (!canvasRef.current || !imageUrl) return;
  
    const canvasElement = canvasRef.current;
    const canvas = new fabric.Canvas(canvasElement);
    canvasElement.fabric = canvas;
  
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const fabricImg = new fabric.Image(img);
      const container = canvasElement.parentNode;
  
      if (!container) {
        console.error("Container not found.");
        return;
      }
  
      const handleCanvasResize = () => {
        const canvasWidth = container.clientWidth;
        const canvasHeight = container.clientHeight;
  
        if (canvasWidth && canvasHeight) {
          canvas.setWidth(canvasWidth);
          canvas.setHeight(canvasHeight);
  
          const scaleFactor = Math.min(canvasWidth / fabricImg.width, canvasHeight / fabricImg.height);
          fabricImg.scale(scaleFactor);
  
          fabricImg.set({
            left: (canvasWidth - fabricImg.getScaledWidth()) / 2,
            top: (canvasHeight - fabricImg.getScaledHeight()) / 2,
          });
  
          canvas.add(fabricImg);
          canvas.sendToBack(fabricImg);
          canvas.renderAll();
          logCanvasLayers(canvas);
        } else {
          console.error("Invalid canvas dimensions.");
        }
      };
  
      window.addEventListener('resize', handleCanvasResize);
      handleCanvasResize();
  
      return () => {
        window.removeEventListener('resize', handleCanvasResize);
        if (canvas) {
          canvas.dispose();
        }
      };
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
      logCanvasLayers(canvas);
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
        logCanvasLayers(canvas);
      }
    }
  };

  const shapeImage = (shapeType) => {
    const canvas = canvasRef.current?.fabric;
    if (canvas) {
      const imgObj = canvas.getObjects('image')[0];
      if (imgObj) {
        switch (shapeType) {
          case 'circle':
            imgObj.set({
              clipPath: new fabric.Circle({
                radius: Math.min(imgObj.width, imgObj.height) / 2,
                originX: 'center',
                originY: 'center'
              })
            });
            break;
          case 'rectangle':
            imgObj.set({
              clipPath: new fabric.Rect({
                width: imgObj.width,
                height: imgObj.height,
                originX: 'center',
                originY: 'center'
              })
            });
            break;
          case 'triangle':
            imgObj.set({
              clipPath: new fabric.Triangle({
                width: imgObj.width,
                height: imgObj.height,
                originX: 'center',
                originY: 'center'
              })
            });
            break;
          case 'polygon':
            imgObj.set({
              clipPath: new fabric.Polygon(
                [
                  { x: 0, y: 0 },
                  { x: imgObj.width / 2, y: 0 },
                  { x: imgObj.width / 2, y: imgObj.height / 2 },
                  { x: 0, y: imgObj.height / 2 },
                ],
                {
                  originX: 'center',
                  originY: 'center'
                }
              )
            });
            break;
          default:
            imgObj.set({ clipPath: null });
        }
        canvas.renderAll();
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
      logCanvasLayers(canvas);
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

  const logCanvasLayers = (canvas) => {
    const layers = canvas.getObjects().map((obj) => {
      if (obj.type === 'image') return 'Image';
      if (obj.type === 'textbox') return 'Text';
      if (obj.type === 'circle' || obj.type === 'triangle' || obj.type === 'rect' || obj.type === 'polygon') return 'Shape';
      return obj.type;
    });
    console.log(layers);
  };

  return (
    <>
      <Styled.Heading>
        <h1 className="heading">Add Caption Page</h1>
      </Styled.Heading>
      <Styled.Container className="container">
        <Styled.CanvasWrapper>
          <div className='canvass'>
            <canvas ref={canvasRef} width={800} height={500}/>
          </div>
          <div className='wrapper'>
            <Styled.ButtonWrapper>
              <Styled.ActionButton onClick={() => shapeImage('circle')}>Shape as Circle</Styled.ActionButton>
              <Styled.ActionButton onClick={() => shapeImage('rectangle')}>Shape as Rectangle</Styled.ActionButton>
              <Styled.ActionButton onClick={() => shapeImage('triangle')}>Shape as Triangle</Styled.ActionButton>
              <Styled.ActionButton onClick={() => shapeImage('polygon')}>Shape as Polygon</Styled.ActionButton>
              <Styled.ActionButton onClick={addText}>Add Text</Styled.ActionButton>
           
              <Styled.ActionButton onClick={addCaption}>Add Caption</Styled.ActionButton>
            </Styled.ButtonWrapper>
            <div className='download'>
              <Styled.ActionButton onClick={downloadImage}>Download</Styled.ActionButton>
            </div>
          </div>
        </Styled.CanvasWrapper>
      </Styled.Container>
    </>
  );
};

export default CanvasPage;
