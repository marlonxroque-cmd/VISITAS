import React, { useState, useEffect } from 'react';
import type { BaseUser } from '../types';
import { PencilIcon, TrashIcon } from './icons';

interface ManageSecurityProps {
    onBack: () => void;
    securityUsers: BaseUser[];
    onAddSecurity: (newSecurity: BaseUser) => void;
    onEditSecurity: (username: string, updatedSecurity: Omit<BaseUser, 'role' | 'username'>) => void;
    onDeleteSecurity: (username: string) => void;
}

const emptySecurity: Omit<BaseUser, 'role'> = {
    username: '', password: '',
};

const SecurityModal = ({
    editingUser,
    formData,
    handleFormChange,
    handleFormSubmit,
    closeModal
}: {
    editingUser: Omit<BaseUser, 'role'> | null;
    formData: Omit<BaseUser, 'role'>;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
    closeModal: () => void;
}) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-brand-dark rounded-2xl shadow-xl w-full max-w-sm p-8">
            <h2 className="text-2xl font-bold mb-6">{editingUser ? 'Editar Guardia' : 'Agregar Guardia'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value={formData.username}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition ${editingUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                    required
                    disabled={!!editingUser}
                />
                <input
                    type="password"
                    name="password"
                    placeholder={editingUser ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                    value={formData.password}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-light focus:outline-none transition"
                    required={!editingUser}
                />
                <div className="flex justify-end gap-4 !mt-6">
                    <button type="button" onClick={closeModal} className="py-2 px-5 bg-slate-600 hover:bg-slate-500 rounded-lg transition">Cancelar</button>
                    <button type="submit" className="py-2 px-5 bg-brand-secondary hover:bg-brand-light rounded-lg transition">Guardar</button>
                </div>
            </form>
        </div>
    </div>
);

const DeleteConfirmationModal = ({
    userToDelete,
    confirmDelete,
    closeModal
}: {
    userToDelete: BaseUser | null;
    confirmDelete: () => void;
    closeModal: () => void;
}) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-brand-dark rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="text-brand-text/80 mb-6">
                ¿Estás seguro de que quieres eliminar la cuenta de <strong className="font-semibold text-white">{userToDelete?.username}</strong>?
            </p>
            <div className="flex justify-center gap-4">
                <button onClick={closeModal} className="py-2 px-6 bg-slate-600 hover:bg-slate-500 rounded-lg transition">Cancelar</button>
                <button onClick={confirmDelete} className="py-2 px-6 bg-red-600 hover:bg-red-500 rounded-lg transition">Eliminar</button>
            </div>
        </div>
    </div>
);

const ManageSecurity = ({ onBack, securityUsers, onAddSecurity, onEditSecurity, onDeleteSecurity }: ManageSecurityProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<BaseUser | null>(null);
    const [userToDelete, setUserToDelete] = useState<BaseUser | null>(null);
    const [formData, setFormData] = useState<Omit<BaseUser, 'role'>>(emptySecurity);

    useEffect(() => {
        if (editingUser) {
            setFormData({ ...editingUser, password: '' });
        } else {
            setFormData(emptySecurity);
        }
    }, [editingUser, isModalOpen]);

    const openModalForEdit = (user: BaseUser) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setEditingUser(null);
        setFormData(emptySecurity);
        setIsModalOpen(true);
    };

    const openDeleteModal = (user: BaseUser) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            const { username, ...updateData } = formData;
            onEditSecurity(username, updateData);
        } else {
            onAddSecurity({ ...formData, role: 'security' });
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            onDeleteSecurity(userToDelete.username);
        }
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    return (
        <div>
            {isModalOpen && <SecurityModal
                editingUser={editingUser}
                formData={formData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
                closeModal={() => setIsModalOpen(false)}
            />}
            {isDeleteModalOpen && <DeleteConfirmationModal
                userToDelete={userToDelete}
                confirmDelete={confirmDelete}
                closeModal={() => setIsDeleteModalOpen(false)}
            />}

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">Gestionar Cuentas de Seguridad</h2>
                <button onClick={openModalForAdd} className="py-2 px-4 bg-brand-secondary hover:bg-brand-light text-white font-semibold rounded-lg shadow-md transition-all duration-300 text-sm">
                    Agregar Guardia
                </button>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg overflow-hidden">
                <div className="space-y-2 p-4 max-h-[40vh] overflow-y-auto min-h-[200px]">
                    {securityUsers.length > 0 ? securityUsers.map(user => (
                        <div key={user.username} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700/70 transition-colors duration-200">
                            <p className="font-bold text-white">{user.username}</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => openModalForEdit(user)} className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-full transition">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => openDeleteModal(user)} className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-full transition">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="flex items-center justify-center h-full min-h-[150px]">
                            <p className="text-center text-brand-text/60">No hay guardias de seguridad registrados.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 text-center">
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

export default ManageSecurity;