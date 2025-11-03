// Fix: Create the AdminPanel component to resolve module errors.
import React, { useState, useEffect } from 'react';
import { LogoutIcon, PencilIcon, TrashIcon } from './icons';
import type { ResidentUser, BaseUser } from '../types';
import ManageSecurity from './ManageSecurity';
import ViewReports from './ViewReports';

interface AdminPanelProps {
    onLogout: () => void;
    residents: ResidentUser[];
    onAddResident: (newResident: ResidentUser) => void;
    onEditResident: (username: string, updatedResident: Omit<ResidentUser, 'role' | 'username'>) => void;
    onDeleteResident: (username: string) => void;
    onTogglePaymentStatus: (username: string) => void;
    securityUsers: BaseUser[];
    onAddSecurity: (newSecurity: BaseUser) => void;
    onEditSecurity: (username: string, updatedSecurity: Omit<BaseUser, 'role' | 'username'>) => void;
    onDeleteSecurity: (username: string) => void;
}

const emptyResident: Omit<ResidentUser, 'role'> = {
    username: '', password: '', name: '', lastName: '', block: '', house: '', phone: '', email: '', paymentStatus: 'Al día',
};

interface ResidentModalProps {
    editingResident: Omit<ResidentUser, 'role'> | null;
    formData: Omit<ResidentUser, 'role'>;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
    closeModal: () => void;
}

const ResidentModal = ({ editingResident, formData, handleFormChange, handleFormSubmit, closeModal }: ResidentModalProps) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-brand-dark rounded-2xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6">{editingResident ? 'Editar Residente' : 'Agregar Residente'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
                    <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
                </div>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
                <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="block" placeholder="Bloque" value={formData.block} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
                    <input type="text" name="house" placeholder="Casa" value={formData.house} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required />
                </div>
                 <input type="text" name="username" placeholder="Nombre de Usuario" value={formData.username} onChange={handleFormChange} className={`w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition ${editingResident ? 'opacity-50 cursor-not-allowed' : ''}`} required disabled={!!editingResident} />
                <input type="password" name="password" placeholder={editingResident ? 'Dejar en blanco para no cambiar' : 'Contraseña'} value={formData.password} onChange={handleFormChange} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition" required={!editingResident} />

                <div className="flex justify-end gap-4 !mt-6">
                    <button type="button" onClick={closeModal} className="py-2 px-5 bg-slate-600 hover:bg-slate-500 rounded-lg transition">Cancelar</button>
                    <button type="submit" className="py-2 px-5 bg-brand-secondary hover:bg-brand-light rounded-lg transition">Guardar</button>
                </div>
            </form>
        </div>
    </div>
);

interface DeleteModalProps {
    residentToDelete: ResidentUser | null;
    confirmDelete: () => void;
    closeModal: () => void;
}

const DeleteConfirmationModal = ({ residentToDelete, confirmDelete, closeModal }: DeleteModalProps) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-brand-dark rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="text-brand-text/80 mb-6">¿Estás seguro de que quieres eliminar a <strong className="font-semibold text-white">{residentToDelete?.name} {residentToDelete?.lastName}</strong>? Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
                <button onClick={closeModal} className="py-2 px-6 bg-slate-600 hover:bg-slate-500 rounded-lg transition">Cancelar</button>
                <button onClick={confirmDelete} className="py-2 px-6 bg-red-600 hover:bg-red-500 rounded-lg transition">Eliminar</button>
            </div>
        </div>
    </div>
);

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => {
    const bgClass = checked ? 'bg-green-500' : 'bg-red-500';
    const transitionClass = 'transition-all duration-300 ease-in-out';
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`${bgClass} ${transitionClass} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-light focus:ring-offset-2 focus:ring-offset-brand-dark`}
        >
            <span
                aria-hidden="true"
                className={`${checked ? 'translate-x-5' : 'translate-x-0'} ${transitionClass} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0`}
            />
        </button>
    );
};


const AdminPanel = ({ 
    onLogout, 
    residents, onAddResident, onEditResident, onDeleteResident, onTogglePaymentStatus,
    securityUsers, onAddSecurity, onEditSecurity, onDeleteSecurity
}: AdminPanelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingResident, setEditingResident] = useState<ResidentUser | null>(null);
    const [residentToDelete, setResidentToDelete] = useState<ResidentUser | null>(null);
    const [formData, setFormData] = useState<Omit<ResidentUser, 'role'>>(emptyResident);
    const [adminView, setAdminView] = useState<'main' | 'security' | 'reports'>('main');
     
    useEffect(() => {
        if (editingResident) {
            // Pre-fill form for editing, but clear password for security
            setFormData({ ...editingResident, password: '' });
        } else {
            setFormData(emptyResident);
        }
    }, [editingResident, isModalOpen]);

    const openModalForEdit = (resident: ResidentUser) => {
        setEditingResident(resident);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setEditingResident(null);
        setFormData(emptyResident);
        setIsModalOpen(true);
    };
    
    const openDeleteModal = (resident: ResidentUser) => {
        setResidentToDelete(resident);
        setIsDeleteModalOpen(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value } as Omit<ResidentUser, 'role'>));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingResident) {
             const { username, ...updateData } = formData;
            onEditResident(username, updateData);
        } else {
            onAddResident({ ...formData, role: 'resident' });
        }
        setIsModalOpen(false);
        setEditingResident(null);
    };

    const confirmDelete = () => {
        if (residentToDelete) {
            onDeleteResident(residentToDelete.username);
        }
        setIsDeleteModalOpen(false);
        setResidentToDelete(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-brand-dark shadow-2xl rounded-2xl min-h-[500px]">
            {isModalOpen && <ResidentModal 
                editingResident={editingResident}
                formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
                closeModal={() => setIsModalOpen(false)}
            />}
            {isDeleteModalOpen && <DeleteConfirmationModal 
                residentToDelete={residentToDelete}
                confirmDelete={confirmDelete}
                closeModal={() => setIsDeleteModalOpen(false)}
            />}

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Panel de Administrador</h1>
                <button onClick={onLogout} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Cerrar Sesión">
                    <LogoutIcon className="w-6 h-6" />
                </button>
            </div>

            {adminView === 'main' && (
                <>
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-white">Residentes Registrados</h2>
                            <button onClick={openModalForAdd} className="py-2 px-5 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                                Agregar Nuevo Residente
                            </button>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg overflow-hidden">
                            <div className="space-y-2 p-4 max-h-[40vh] overflow-y-auto">
                                {residents.length > 0 ? residents.map(res => (
                                    <div key={res.username} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700/70 transition-colors duration-200">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="font-bold text-white text-lg">{res.name} {res.lastName}</p>
                                                <p className="text-sm text-brand-text/70">{res.email}</p>
                                            </div>
                                            <div className="text-right text-brand-text/90">
                                                <span className="font-semibold">Bloque {res.block}</span><br/>
                                                <span className="text-sm">Casa {res.house}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                             <div className="flex flex-col items-center gap-1">
                                                <span className={`text-xs font-bold`}>
                                                    {res.paymentStatus === 'Al día' ? 'Al día' : 'Pendiente'}
                                                </span>
                                                <ToggleSwitch
                                                    checked={res.paymentStatus === 'Al día'}
                                                    onChange={() => onTogglePaymentStatus(res.username)}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => openModalForEdit(res)} className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-full transition">
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => openDeleteModal(res)} className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-full transition">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p className="text-center p-8 text-brand-text/60">No hay residentes registrados.</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Otras Acciones</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <button onClick={() => setAdminView('security')} className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
                                Gestionar Seguridad
                            </button>
                            <button onClick={() => setAdminView('reports')} className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
                                Ver Reportes
                            </button>
                        </div>
                    </div>
                </>
            )}

            {adminView === 'security' && <ManageSecurity 
                onBack={() => setAdminView('main')} 
                securityUsers={securityUsers}
                onAddSecurity={onAddSecurity}
                onEditSecurity={onEditSecurity}
                onDeleteSecurity={onDeleteSecurity}
            />}
            {adminView === 'reports' && <ViewReports onBack={() => setAdminView('main')} residents={residents} />}

        </div>
    );
};

export default AdminPanel;