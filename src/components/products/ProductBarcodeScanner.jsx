import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Scan, X } from 'lucide-react';

const ProductBarcodeScanner = ({ onBarcodeDetected }) => {
  const [scanning, setScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { toast } = useToast();
  
  // Check if camera is available
  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasCamera(videoDevices.length > 0);
      } catch (error) {
        console.error('Error checking camera:', error);
        setHasCamera(false);
      }
    };
    
    checkCamera();
  }, []);
  
  // Start scanning
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        
        // In a real implementation, we would use a barcode scanning library
        // like QuaggaJS or ZXing to detect barcodes from the video stream
        
        // For this demo, we'll simulate barcode detection after a delay
        setTimeout(() => {
          simulateBarcodeDetection();
        }, 3000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };
  
  // Stop scanning
  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };
  
  // Simulate barcode detection (in a real app, this would be replaced with actual detection)
  const simulateBarcodeDetection = () => {
    if (!scanning) return;
    
    // Generate a random barcode for demonstration
    const randomBarcode = Math.floor(Math.random() * 10000000000000).toString();
    
    // Take a snapshot from the video
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // In a real app, we would process this image to detect barcodes
      
      // Call the callback with the detected barcode
      onBarcodeDetected(randomBarcode);
      
      // Stop scanning
      stopScanning();
      
      toast({
        title: "Barcode Detected",
        description: `Barcode: ${randomBarcode}`,
      });
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      {!hasCamera && (
        <div className="text-center text-red-500 mb-4">
          No camera detected. Please check your device.
        </div>
      )}
      
      <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
        {scanning && (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              playsInline
            />
            <div className="absolute inset-0 border-2 border-primary/50 flex items-center justify-center">
              <div className="w-3/4 h-1/4 border-2 border-primary animate-pulse"></div>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={stopScanning}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {!scanning && (
          <div className="flex items-center justify-center h-full">
            <Button 
              onClick={startScanning} 
              disabled={!hasCamera}
              className="flex items-center"
            >
              <Scan className="mr-2 h-4 w-4" />
              Scan Barcode
            </Button>
          </div>
        )}
      </div>
      
      {/* Hidden canvas for processing video frames */}
      <canvas ref={canvasRef} className="hidden" />
      
      <p className="text-sm text-muted-foreground mt-2">
        Position the barcode within the frame to scan.
      </p>
    </div>
  );
};

export default ProductBarcodeScanner;