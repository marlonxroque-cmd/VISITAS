import React from 'react';
import type { ResidentUser } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface ViewReportsProps {
    onBack: () => void;
    residents: ResidentUser[];
}

const ViewReports = ({ onBack, residents }: ViewReportsProps) => {
    const onTimeCount = residents.filter(r => r.paymentStatus === 'Al día').length;
    const pendingCount = residents.filter(r => r.paymentStatus === 'Pendiente de pago').length;
    const totalCount = residents.length;

    const onTimePercentage = totalCount > 0 ? (onTimeCount / totalCount) * 100 : 0;
    const pendingPercentage = totalCount > 0 ? (pendingCount / totalCount) * 100 : 0;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-white mb-6">Reporte de Estado de Pagos</h2>
            
            <div className="bg-slate-900/50 rounded-lg p-6">
                <div className="mb-6 flex justify-around text-center">
                    <div>
                        <p className="text-sm text-brand-text/70">Total Residentes</p>
                        <p className="text-3xl font-bold text-white">{totalCount}</p>
                    </div>
                    <div>
                        <p className="text-sm text-green-400/80">Al día</p>
                        <p className="text-3xl font-bold text-green-400">{onTimeCount}</p>
                    </div>
                    <div>
                        <p className="text-sm text-red-400/80">Pendiente</p>
                        <p className="text-3xl font-bold text-red-400">{pendingCount}</p>
                    </div>
                </div>

                {totalCount > 0 ? (
                    <div className="w-full h-64 flex items-end justify-center gap-8 px-4">
                        {/* Bar for "Al día" */}
                        <div className="flex flex-col items-center h-full w-24">
                            <div className="flex-grow flex items-end w-full">
                                <div 
                                    className="w-full bg-green-500 rounded-t-lg transition-all duration-700 ease-out"
                                    style={{ height: `${onTimePercentage}%` }}
                                ></div>
                            </div>
                            <div className="text-center mt-2">
                                <p className="font-bold text-lg text-green-400">{onTimePercentage.toFixed(0)}%</p>
                                <p className="text-sm text-brand-text/80">Al día</p>
                            </div>
                        </div>

                        {/* Bar for "Pendiente" */}
                        <div className="flex flex-col items-center h-full w-24">
                            <div className="flex-grow flex items-end w-full">
                                <div 
                                    className="w-full bg-red-500 rounded-t-lg transition-all duration-700 ease-out"
                                    style={{ height: `${pendingPercentage}%` }}
                                ></div>
                            </div>
                            <div className="text-center mt-2">
                                <p className="font-bold text-lg text-red-400">{pendingPercentage.toFixed(0)}%</p>
                                <p className="text-sm text-brand-text/80">Pendiente</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 text-brand-text/60">
                        No hay datos de residentes para mostrar.
                    </div>
                )}
            </div>

             <div className="mt-8 text-center">
                <button 
                    onClick={onBack} 
                    className="py-2 px-6 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                    Volver al Panel Principal
                </button>
            </div>
        </div>
    );
};

export default ViewReports;