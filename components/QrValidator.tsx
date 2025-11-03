import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import type { VisitInfo } from '../types';
import { LogoutIcon, CheckCircleIcon, XCircleIcon, SpinnerIcon } from './icons';

type ValidationStatus = 'valid' | 'invalid' | 'error';
interface ValidationResult {
  status: ValidationStatus;
  message: string;
  info?: VisitInfo;
}

type CameraStatus = 'idle' | 'loading' | 'scanning' | 'error';

const QrValidator = ({ onBack }: { onBack: () => void }) => {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('idle');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const stopScan = useCallback(() => {
    if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    if(videoRef.current) {
        videoRef.current.srcObject = null;
    }
    setCameraStatus('idle');
  }, []);

  const handleScan = useCallback((data: string) => {
    try {
        const parsedData = JSON.parse(data) as VisitInfo;

        if (parsedData.visitorName && parsedData.visitingWho && parsedData.validUntil && parsedData.identity && parsedData.visitReason && parsedData.paymentStatus) {
            
            if (parsedData.paymentStatus === 'Pendiente de pago') {
                 setValidationResult({ status: 'invalid', message: 'Acceso denegado por falta de pago del residente.', info: parsedData });
            } else {
                const now = new Date();
                const validUntil = new Date(parsedData.validUntil);
                if (now > validUntil) {
                    setValidationResult({ status: 'invalid', message: 'Este código QR ha expirado.', info: parsedData });
                } else {
                    setValidationResult({ status: 'valid', message: 'Acceso Permitido.', info: parsedData });
                }
            }
        } else {
            throw new Error("Formato de código QR inválido.");
        }
    } catch (e) {
        setValidationResult({ status: 'error', message: 'Código QR inválido. No es un pase de visita válido.' });
    }
    stopScan();
  }, [stopScan]);

  const tick = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          handleScan(code.data);
          return;
        }
      }
    }
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [handleScan]);

  const startScan = useCallback(async () => {
    setValidationResult(null);
    setCameraStatus('loading');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        
        videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
                videoRef.current.play().catch(err => console.error("Video play failed:", err));
                setCameraStatus('scanning');
                animationFrameRef.current = requestAnimationFrame(tick);
            }
        };
      }
    } catch (err) {
      console.error("Error de acceso a la cámara:", err);
      setValidationResult({ status: 'error', message: 'No se pudo acceder a la cámara. Por favor, conceda el permiso.' });
      setCameraStatus('error');
    }
  }, [tick]);
  
  useEffect(() => {
    return () => { // Cleanup on unmount
      stopScan();
    };
  }, [stopScan]);
  
  const ResultCard = ({ result }: { result: ValidationResult }) => {
    const isSuccess = result.status === 'valid';
    const bgColor = isSuccess ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500';
    const textColor = isSuccess ? 'text-green-400' : 'text-red-400';
    const Icon = isSuccess ? CheckCircleIcon : XCircleIcon;

    return (
        <div className={`w-full p-6 rounded-2xl border ${bgColor} text-center space-y-4`}>
            <Icon className={`w-20 h-20 mx-auto ${textColor}`} />
            <h2 className={`text-4xl font-bold ${textColor}`}>{result.status === 'valid' ? 'ACCESO PERMITIDO' : 'ACCESO DENEGADO'}</h2>
            <p className="text-lg text-brand-text">{result.message}</p>
            {result.info && (
                <div className="text-left w-full bg-slate-800 p-4 rounded-lg border border-slate-700 mt-4 space-y-1">
                    <p><strong className="font-semibold text-brand-text/80">Visitante:</strong> {result.info.visitorName}</p>
                    <p><strong className="font-semibold text-brand-text/80">Identidad:</strong> {result.info.identity}</p>
                    <p><strong className="font-semibold text-brand-text/80">Visita a:</strong> {result.info.visitingWho}</p>
                    {result.info.paymentStatus &&
                        <p><strong className="font-semibold text-brand-text/80">Estado de Pago:</strong>
                            <span className={`ml-2 font-bold ${result.info.paymentStatus === 'Al día' ? 'text-green-400' : 'text-red-400'}`}>
                                {result.info.paymentStatus}
                            </span>
                        </p>
                    }
                    {(result.info.vehicle || result.info.licensePlate) && 
                      <p><strong className="font-semibold text-brand-text/80">Vehículo:</strong> {result.info.vehicle || 'N/A'} ({result.info.licensePlate || 'N/A'})</p>
                    }
                    <p><strong className="font-semibold text-brand-text/80">Motivo:</strong> {result.info.visitReason}</p>
                    <p><strong className="font-semibold text-brand-text/80">Válido Hasta:</strong> {new Date(result.info.validUntil).toLocaleString()}</p>
                </div>
            )}
            <button onClick={startScan} className="w-full mt-6 py-3 px-4 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                Escanear Siguiente QR
            </button>
        </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-8 bg-brand-dark shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Validar Código QR</h1>
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Cerrar Sesión">
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
      
      {validationResult ? (
        <ResultCard result={validationResult} />
      ) : (
        <>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center text-center">
            <video ref={videoRef} className={`absolute top-0 left-0 w-full h-full object-cover ${cameraStatus !== 'scanning' ? 'hidden' : ''}`} />
            
            {cameraStatus === 'scanning' && (
              <>
                <div className="absolute inset-0 border-8 border-white/20 rounded-2xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 border-4 border-dashed border-brand-light rounded-lg animate-pulse"></div>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </>
            )}
            
            {cameraStatus === 'idle' && (
                <div>
                  <p className="mb-4 text-brand-text/80">Presione el botón para iniciar la cámara.</p>
                  <button onClick={startScan} className="py-3 px-6 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                    Iniciar Escaneo
                  </button>
                </div>
            )}

            {cameraStatus === 'loading' && (
                <div className="space-y-4">
                    <SpinnerIcon className="w-16 h-16 mx-auto animate-spin text-brand-light" />
                    <p className="text-brand-text/80">Iniciando cámara...</p>
                </div>
            )}
          </div>
           {cameraStatus === 'scanning' && (
             <button onClick={stopScan} className="w-full mt-6 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
                Cancelar Escaneo
            </button>
           )}
        </>
      )}
    </div>
  );
};

export default QrValidator;