import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import type { VisitInfo, ResidentUser } from '../types';
import { DownloadIcon, WhatsappIcon, LogoutIcon } from './icons';

interface RegistrationFormProps {
    onLogout: () => void;
    residentInfo: ResidentUser;
}

const RegistrationForm = ({ onLogout, residentInfo }: RegistrationFormProps) => {
  const [visitorName, setVisitorName] = useState('');
  const [identity, setIdentity] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitReason, setVisitReason] = useState<'Familiar' | 'Delivery' | 'Otros'>('Familiar');
  
  const [visitInfo, setVisitInfo] = useState<VisitInfo | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (visitInfo && qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, JSON.stringify(visitInfo), { width: 256, errorCorrectionLevel: 'H' }, (error: Error | null) => {
        if (error) console.error(error);
      });
    }
  }, [visitInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !identity || !visitorPhone) {
      alert('Por favor, rellene todos los campos obligatorios.');
      return;
    }
    const now = new Date();
    const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Valid for 24 hours
    const visitingWho = `${residentInfo.name} ${residentInfo.lastName}, Casa ${residentInfo.house}, Bloque ${residentInfo.block}`;

    setVisitInfo({
      visitorName,
      identity,
      vehicle,
      licensePlate,
      visitorPhone,
      visitReason,
      visitingWho,
      visitDate: now.toISOString(),
      validUntil: validUntil.toISOString(),
      id: `visit_${Date.now()}`,
      paymentStatus: residentInfo.paymentStatus,
    });
  };
  
  const handleCreateAnother = () => {
    setVisitInfo(null);
    setVisitorName('');
    setIdentity('');
    setVehicle('');
    setLicensePlate('');
    setVisitorPhone('');
    setVisitReason('Familiar');
  };

  const handleDownload = () => {
    if (!qrCanvasRef.current || !visitInfo) return;
    const canvas = qrCanvasRef.current;
    const link = document.createElement('a');
    link.download = `Visita_Residencial_Briceno_${visitInfo.visitorName.replace(/\s/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    if (!qrCanvasRef.current || !visitInfo) return;
    const canvas = qrCanvasRef.current;
    canvas.toBlob(async (blob) => {
      if (blob && navigator.share) {
        const file = new File([blob], `Visita_Residencial_Briceno_${visitInfo.visitorName.replace(/\s/g, '_')}.png`, { type: 'image/png' });
        try {
          await navigator.share({
            title: 'Pase de Visita',
            text: `Aquí está tu pase de visita para Residencial Briceño para ${visitInfo.visitorName}.`,
            files: [file],
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        alert('Sharing is not supported on this browser. Please download the QR code instead.');
      }
    }, 'image/png');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-8 bg-brand-dark shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Registrar Visita</h1>
        <button onClick={onLogout} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Cerrar Sesión">
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>

      {!visitInfo ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="visitorName" className="block text-sm font-medium text-brand-text mb-2">Nombre del Visitante</label>
            <input type="text" id="visitorName" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
          </div>
          <div>
            <label htmlFor="identity" className="block text-sm font-medium text-brand-text mb-2">Identidad</label>
            <input type="text" id="identity" value={identity} onChange={(e) => setIdentity(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
          </div>
          <div>
            <label htmlFor="visitorPhone" className="block text-sm font-medium text-brand-text mb-2">Número de Teléfono</label>
            <input type="tel" id="visitorPhone" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-brand-text mb-2">Vehículo (Opcional)</label>
              <input type="text" id="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" />
            </div>
            <div>
              <label htmlFor="licensePlate" className="block text-sm font-medium text-brand-text mb-2">Placa (Opcional)</label>
              <input type="text" id="licensePlate" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" />
            </div>
          </div>
          <div>
              <label htmlFor="visitReason" className="block text-sm font-medium text-brand-text mb-2">Motivo de Visita</label>
              <select id="visitReason" value={visitReason} onChange={(e) => setVisitReason(e.target.value as any)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition">
                <option>Familiar</option>
                <option>Delivery</option>
                <option>Otros</option>
              </select>
          </div>
          <button type="submit" className="w-full !mt-6 py-3 px-4 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Generar Código QR
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl font-semibold text-white">Pase de Visita Listo</h2>
          <div className="p-4 bg-white rounded-lg shadow-inner">
            <canvas ref={qrCanvasRef}></canvas>
          </div>
          <p className="text-sm text-amber-400">El visitante debe presentar este código QR para ser escaneado en la entrada.</p>
          <div className="w-full flex flex-col sm:flex-row gap-4">
            {navigator.share && (
              <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
                <WhatsappIcon className="w-5 h-5" />
                Compartir QR
              </button>
            )}
            <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
              <DownloadIcon className="w-5 h-5" />
              Descargar QR
            </button>
          </div>
          <button onClick={handleCreateAnother} className="w-full py-3 px-4 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
            Registrar Otro Visitante
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;