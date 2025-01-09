"use client";

import { FC, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EditImageProps {
    base64Image: string;
    onSave: (editedImage: string[]) => void;
}


export const EditImage: FC<EditImageProps> = ({ base64Image, onSave }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const baseCanvasRef = useRef<HTMLCanvasElement>(null);
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const baseContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const drawContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(20);
    const [brushColor, setBrushColor] = useState("black");
    const [brushHardness, setBrushHardness] = useState(1);
    const [brushSmoothness, setBrushSmoothness] = useState(0.5);
    const [brushOpacity, setBrushOpacity] = useState(1);
    const [isEraserMode, setIsEraserMode] = useState(false);
    const [scale, setScale] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [showCustomCursor, setShowCustomCursor] = useState(false);

    const drawOriginalImage = () => {
        const baseCanvas = baseCanvasRef.current;
        const baseContext = baseContextRef.current;
        if (!baseCanvas || !baseContext) return;

        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
            baseCanvas.width = image.width;
            baseCanvas.height = image.height;
            baseContext.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
            baseContext.drawImage(image, 0, 0);

            // Initialize the drawing canvas
            const drawCanvas = drawCanvasRef.current;
            if (drawCanvas) {
                drawCanvas.width = image.width;
                drawCanvas.height = image.height;
            }
            // Adjust initial zoom and position
            fitImageToContainer();
        };
        image.src = base64Image;
    };

    const fitImageToContainer = () => {
        const container = containerRef.current;
        const baseCanvas = baseCanvasRef.current;
        if (!container || !baseCanvas) return;

        const containerAspectRatio = container.clientWidth / container.clientHeight;
        const imageAspectRatio = baseCanvas.width / baseCanvas.height;

        let newScale;
        if (containerAspectRatio > imageAspectRatio) {
            newScale = container.clientHeight / baseCanvas.height;
        } else {
            newScale = container.clientWidth / baseCanvas.width;
        }

        setScale(newScale);
        setOffsetX((container.clientWidth - baseCanvas.width * newScale) / 2);
        setOffsetY((container.clientHeight - baseCanvas.height * newScale) / 2);
    };

    useEffect(() => {
        const baseCanvas = baseCanvasRef.current;
        const drawCanvas = drawCanvasRef.current;
        if (!baseCanvas || !drawCanvas) return;

        const baseContext = baseCanvas.getContext("2d");
        const drawContext = drawCanvas.getContext("2d");
        if (baseContext && drawContext) {
            baseContextRef.current = baseContext;
            drawContextRef.current = drawContext;
            drawContext.lineCap = "round";
            drawContext.lineJoin = "round";

            drawOriginalImage();
        }

        window.addEventListener('resize', fitImageToContainer);
        return () => {
            window.removeEventListener('resize', fitImageToContainer);
        };
    }, [base64Image]);

    const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        setIsDrawing(true);

        const drawCanvas = drawCanvasRef.current;
        const drawContext = drawContextRef.current;

        if (drawCanvas && drawContext) {
            const { x, y } = getCanvasCoordinates(event);

            drawContext.beginPath();
            drawContext.moveTo(x, y);

            if (isEraserMode) {
                drawContext.globalCompositeOperation = 'destination-out';
            } else {
                drawContext.globalCompositeOperation = 'source-over';
                drawContext.strokeStyle = brushColor;
            }
            drawContext.lineWidth = brushSize / scale;
            drawContext.shadowBlur = (1 - brushHardness) * 20 / scale;
            drawContext.shadowColor = brushColor;
            drawContext.globalAlpha = brushOpacity;
        }
    };

    const draw = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        if (!isDrawing) return;

        const drawCanvas = drawCanvasRef.current;
        const drawContext = drawContextRef.current;

        if (drawCanvas && drawContext) {
            const { x, y } = getCanvasCoordinates(event);

            drawContext.lineTo(x, y);
            drawContext.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (drawContextRef.current) {
            drawContextRef.current.closePath();
        }
    };

    const getCanvasCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
        const canvas = baseCanvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return { x: 0, y: 0 };

        const rect = container.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

        return {
            x: (clientX - rect.left - offsetX) / scale,
            y: (clientY - rect.top - offsetY) / scale
        };
    };

    const resetImage = () => {
        if (drawCanvasRef.current && drawContextRef.current) {
            drawContextRef.current.clearRect(0, 0, drawCanvasRef.current.width, drawCanvasRef.current.height);
        }
    };

    const getEditedImage = () => {
        const baseCanvas = baseCanvasRef.current;
        const drawCanvas = drawCanvasRef.current;
        if (!baseCanvas || !drawCanvas) return;

        const resultCanvas = document.createElement('canvas');
        resultCanvas.width = baseCanvas.width;
        resultCanvas.height = baseCanvas.height;
        const resultContext = resultCanvas.getContext('2d');
        if (!resultContext) return;

        resultContext.drawImage(baseCanvas, 0, 0);
        resultContext.drawImage(drawCanvas, 0, 0);

        const editedImageUrl = resultCanvas.toDataURL();
        // console.log("Edited image as base64:", editedImageUrl);
        let maskImage = getMaskImage()
        onSave([editedImageUrl, maskImage || ""]);
    };

    const getMaskImage = () => {
        const drawCanvas = drawCanvasRef.current;
        if (!drawCanvas) return;

        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = drawCanvas.width;
        maskCanvas.height = drawCanvas.height;
        const maskContext = maskCanvas.getContext('2d');
        if (!maskContext) return;

        // 1. First, fill the entire canvas with black as the background
        maskContext.fillStyle = 'black';
        maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

        // 2. Set the applied content to white
        // maskContext.globalCompositeOperation = 'source-over';
        // maskContext.fillStyle = 'white';

        // 3. Using the content of drawCanvas as a mask
        const drawCanvasContext = drawCanvas.getContext('2d');
        if (drawCanvasContext) {
            const imageData = drawCanvasContext.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
            const data = imageData.data;

            // Create a new ImageData to store white smudges
            const maskImageData = maskContext.createImageData(drawCanvas.width, drawCanvas.height);
            const maskData = maskImageData.data;

            // Set the applied area (non transparent area) to white
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) {
                    maskData[i] = 255;     // R
                    maskData[i + 1] = 255; // G
                    maskData[i + 2] = 255; // B
                    maskData[i + 3] = 255; // A
                }
            }

            // Put the processed data back on the canvas
            maskContext.putImageData(maskImageData, 0, 0);
        }

        return maskCanvas.toDataURL();
        // console.log("Mask image as base64:", maskImageUrl);
        // onGetMask(maskImageUrl);
    };

    const handleWheel = (event: React.WheelEvent) => {
        event.preventDefault();
        const container = containerRef.current;
        const baseCanvas = baseCanvasRef.current;
        if (!container || !baseCanvas) return;

        const rect = container.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const wheelDelta = event.deltaY;
        const zoomIntensity = 0.1;
        const zoom = Math.exp(-wheelDelta / 200 * zoomIntensity);

        const newScale = scale * zoom;
        if (newScale < 0.1 || newScale > 10) return; // Limit zoom range

        const canvasX = (mouseX - offsetX) / scale;
        const canvasY = (mouseY - offsetY) / scale;

        const newOffsetX = mouseX - canvasX * newScale;
        const newOffsetY = mouseY - canvasY * newScale;

        setScale(newScale);
        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            setCursorPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        }
    };

    return (
        <div className="editImage-can md:flex flex-col md:flex-row items-start w-full gap-4 mt-[50px] md:mt-0" style={{
            height: "100%",
            overflow: "auto"
        }}>
            <div className="flex gap-4 absolute md:hidden top-[20px]">
                <Button onClick={resetImage} variant="outline">
                    Clear
                </Button>
                <Button onClick={getEditedImage}>Save</Button>
            </div>

            <div className="md:hidden">
                <div className="flex" style={{
                    alignItems: "center"
                }}>
                    <svg onClick={() => setIsEraserMode(false)} className="icon mr-4" style={{
                        cursor: "pointer"
                    }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7317" width="40" height="40"><path fill={isEraserMode ? "#333333" : "#3b82f6"} d="M358.681 586.386s-90.968 49.4-94.488 126.827c-3.519 77.428-77.427 133.74-102.063 140.778s360.157 22.971 332.002-142.444l-135.45-125.16z m169.099 52.56c14.016 13.601 17.565 32.675 7.929 42.606-9.635 9.93-28.81 6.954-42.823-6.647l-92.767-88.518c-14.015-13.6-17.565-32.675-7.929-42.605 9.636-9.93 28.81-6.955 42.824 6.646l92.766 88.518z m321.734-465.083c-25.144-17.055-47.741-1.763-57.477 3.805-29.097 19.485-237.243 221.77-327.69 315.194-11.105 14.8-18.59 26.294 34.663 79.546 44.95 44.95 65.896 42.012 88.66 22.603 37.906-37.906 199.299-262.926 258.92-348.713 9.792-14.092 29.851-54.17 2.924-72.435z" p-id="7318"></path></svg>

                    <svg onClick={() => setIsEraserMode(true)} className="icon" style={{
                        cursor: "pointer"
                    }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6151" width="30" height="30"><path fill={!isEraserMode ? "#333333" : "#3b82f6"} d="M953.173333 259.413333l-187.733333-187.733333c-38.826667-38.826667-101.973333-38.826667-140.8 0L115.2 581.546667c-18.773333 18.773333-29.013333 43.946667-29.013333 70.4 0 26.453333 10.24 51.626667 29.013333 70.4l187.733333 187.733333c18.773333 18.773333 43.946667 29.013333 70.4 29.013333 26.453333 0 51.626667-10.24 70.4-29.013333L953.173333 400.213333a99.84 99.84 0 0 0 0-140.8zM383.573333 849.493333c-7.253333 7.253333-12.8 7.253333-20.053333 0l-187.733333-187.733333a14.805333 14.805333 0 0 1-4.266667-10.24c0-2.133333 0.426667-6.4 4.266667-10.24l180.906666-180.906667c2.56 4.266667 4.266667 8.533333 8.106667 11.946667l187.733333 187.733333c3.413333 3.413333 8.106667 5.546667 11.946667 8.106667l-180.906667 181.333333z" p-id="6152"></path></svg>
                </div>

                <div className="mt-1">
                    <Label>Stroke Color</Label>
                    <RadioGroup
                        defaultValue="black"
                        onValueChange={(value) => setBrushColor(value)}
                        className="flex space-x-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="black" id="black" />
                            <Label htmlFor="black">black</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="white" id="white" />
                            <Label htmlFor="white">white</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gray" id="gray" />
                            <Label htmlFor="gray">gray</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="mt-1">
                    <Label>Thickness: {brushSize}px</Label>
                    <Slider
                        min={1}
                        max={50}
                        step={1}
                        value={[brushSize]}
                        onValueChange={(value) => setBrushSize(value[0])}
                    />
                </div>
                <div className="mt-1">
                    <Label>Opacity: {Math.round(brushOpacity * 100)}%</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[brushOpacity]}
                        onValueChange={(value) => setBrushOpacity(value[0])}
                    />
                </div>
                <div className="mt-1">
                    <Label>Hardness: {Math.round(brushHardness * 100)}%</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[brushHardness]}
                        onValueChange={(value) => setBrushHardness(value[0])}
                    />
                </div>
                <div className="mt-1">
                    <Label>Smoothing Precision: {Math.round(brushSmoothness * 100)}%</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[brushSmoothness]}
                        onValueChange={(value) => setBrushSmoothness(value[0])}
                    />
                </div>

            </div>

            <div
                className="w-full md:w-3/4 relative mt-[40px] md:mt-0 h-[500px] canvas-main"
                ref={containerRef}
                style={{
                    height: 'calc(100vh - 50px)',
                    overflow: 'hidden',
                    cursor: showCustomCursor ? 'none' : 'default',
                    position: 'relative',
                    background: "#404149",
                }}
                onWheel={handleWheel}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowCustomCursor(true)}
                onMouseLeave={() => setShowCustomCursor(false)}
            >
                <canvas
                    ref={baseCanvasRef}
                    className="absolute"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        left: `${offsetX}px`,
                        top: `${offsetY}px`,
                    }}
                />
                <canvas
                    ref={drawCanvasRef}
                    className="absolute touch-none"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        left: `${offsetX}px`,
                        top: `${offsetY}px`,
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
                {showCustomCursor && (
                    <div
                        style={{
                            position: 'absolute',
                            pointerEvents: 'none',
                            border: '2px solid #000',
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                            left: `${cursorPosition.x}px`,
                            top: `${cursorPosition.y}px`,
                            width: `${brushSize}px`,
                            height: `${brushSize}px`,
                            backgroundColor: isEraserMode ? 'rgba(255, 255, 255, 0.5)' : `${brushColor}80`,
                        }}
                    />
                )}
            </div>
            <div className="w-full md:w-1/4 space-y-4 save-hi">
                <div className="mt-4 flex" style={{
                    alignItems: "center"
                }}>
                    <svg onClick={() => setIsEraserMode(false)} className="icon mr-4" style={{
                        cursor: "pointer"
                    }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7317" width="40" height="40"><path fill={isEraserMode ? "#333333" : "#3b82f6"} d="M358.681 586.386s-90.968 49.4-94.488 126.827c-3.519 77.428-77.427 133.74-102.063 140.778s360.157 22.971 332.002-142.444l-135.45-125.16z m169.099 52.56c14.016 13.601 17.565 32.675 7.929 42.606-9.635 9.93-28.81 6.954-42.823-6.647l-92.767-88.518c-14.015-13.6-17.565-32.675-7.929-42.605 9.636-9.93 28.81-6.955 42.824 6.646l92.766 88.518z m321.734-465.083c-25.144-17.055-47.741-1.763-57.477 3.805-29.097 19.485-237.243 221.77-327.69 315.194-11.105 14.8-18.59 26.294 34.663 79.546 44.95 44.95 65.896 42.012 88.66 22.603 37.906-37.906 199.299-262.926 258.92-348.713 9.792-14.092 29.851-54.17 2.924-72.435z" p-id="7318"></path></svg>

                    <svg onClick={() => setIsEraserMode(true)} className="icon" style={{
                        cursor: "pointer"
                    }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6151" width="30" height="30"><path fill={!isEraserMode ? "#333333" : "#3b82f6"} d="M953.173333 259.413333l-187.733333-187.733333c-38.826667-38.826667-101.973333-38.826667-140.8 0L115.2 581.546667c-18.773333 18.773333-29.013333 43.946667-29.013333 70.4 0 26.453333 10.24 51.626667 29.013333 70.4l187.733333 187.733333c18.773333 18.773333 43.946667 29.013333 70.4 29.013333 26.453333 0 51.626667-10.24 70.4-29.013333L953.173333 400.213333a99.84 99.84 0 0 0 0-140.8zM383.573333 849.493333c-7.253333 7.253333-12.8 7.253333-20.053333 0l-187.733333-187.733333a14.805333 14.805333 0 0 1-4.266667-10.24c0-2.133333 0.426667-6.4 4.266667-10.24l180.906666-180.906667c2.56 4.266667 4.266667 8.533333 8.106667 11.946667l187.733333 187.733333c3.413333 3.413333 8.106667 5.546667 11.946667 8.106667l-180.906667 181.333333z" p-id="6152"></path></svg>
                </div>

                <div>
                    <Label>Stroke Color</Label>
                    <RadioGroup
                        defaultValue="black"
                        onValueChange={(value) => setBrushColor(value)}
                        className="flex space-x-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="black" id="black" />
                            <Label htmlFor="black">black</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="white" id="white" />
                            <Label htmlFor="white">white</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gray" id="gray" />
                            <Label htmlFor="gray">gray</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label>Thickness: {brushSize}px</Label>
                    <Slider
                        min={1}
                        max={50}
                        step={1}
                        value={[brushSize]}
                        onValueChange={(value) => setBrushSize(value[0])}
                    />
                </div>
                <div>
                    <Label>Opacity: {Math.round(brushOpacity * 100)}%</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[brushOpacity]}
                        onValueChange={(value) => setBrushOpacity(value[0])}
                    />
                </div>
                <div>
                    <Label>Hardness: {Math.round(brushHardness * 100)}%</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[brushHardness]}
                        onValueChange={(value) => setBrushHardness(value[0])}
                    />
                </div>
                <div>
                    <Label>Smoothing Precision: {Math.round(brushSmoothness * 100)}%</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[brushSmoothness]}
                        onValueChange={(value) => setBrushSmoothness(value[0])}
                    />
                </div>


                <div className="flex gap-4  mt-[40px]">
                    <Button onClick={resetImage} variant="outline">
                        Clear
                    </Button>
                    <Button onClick={getEditedImage}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default EditImage;

