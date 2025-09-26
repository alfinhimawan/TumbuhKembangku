import React, { useState } from 'react';
import { useChildren } from '../contexts/ChildContext';
import { formatAge } from '../utils/helpers';
import AddChildModal from '../components/Child/AddChildModal';
import EditChildModal from '../components/Child/EditChildModal';
import { Child } from '../types';

const Children: React.FC = () => {
  const { children, selectedChild, selectChild, deleteChild } = useChildren();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleSelectChild = (child: Child) => {
    selectChild(child);
  };

  const handleEditChild = (child: Child) => {
    setEditingChild(child);
  };

  const handleDeleteChild = (childId: string) => {
    deleteChild(childId);
    setShowDeleteConfirm(null);
  };

  const confirmDelete = (childId: string) => {
    setShowDeleteConfirm(childId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Anak</h1>
          <p className="text-gray-600 mt-1">Tambah, edit, atau pilih profil anak untuk dipantau</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span className="text-lg">+</span>
          <span>Tambah Anak</span>
        </button>
      </div>

      {/* Children List */}
      {children.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
          <div className="text-6xl mb-4">👶</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Belum Ada Profil Anak
          </h3>
          <p className="text-gray-600 mb-6">
            Mulai dengan menambahkan profil anak pertama Anda untuk memantau tumbuh kembangnya
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tambah Anak Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <div
              key={child.id}
              className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 ${
                selectedChild?.id === child.id 
                  ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                  : 'border-gray-100 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Selected Badge */}
              {selectedChild?.id === child.id && (
                <div className="mb-3">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Terpilih
                  </span>
                </div>
              )}

              {/* Child Photo/Avatar */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl text-white mr-4">
                  {child.gender === 'male' ? '👦' : '👧'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{child.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{child.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                </div>
              </div>

              {/* Child Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usia:</span>
                  <span className="font-medium text-gray-800">{formatAge(child.birthDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tanggal Lahir:</span>
                  <span className="font-medium text-gray-800">
                    {new Date(child.birthDate).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {selectedChild?.id !== child.id && (
                  <button
                    onClick={() => handleSelectChild(child)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Pilih
                  </button>
                )}
                <button
                  onClick={() => handleEditChild(child)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                {children.length > 1 && (
                  <button
                    onClick={() => confirmDelete(child.id)}
                    className="bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AddChildModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <EditChildModal 
        child={editingChild}
        isOpen={!!editingChild}
        onClose={() => setEditingChild(null)}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Hapus Profil Anak?
              </h3>
              <p className="text-gray-600 mb-6">
                Tindakan ini tidak dapat dibatalkan. Semua data terkait anak ini akan terhapus.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDeleteChild(showDeleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-medium text-blue-800 mb-2">💡 Petunjuk:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Pilih anak untuk memulai skrining dan melihat rekomendasi aktivitas</li>
          <li>• Anda dapat mengelola profil lebih dari satu anak dalam akun yang sama</li>
          <li>• Data yang akurat (terutama tanggal lahir) penting untuk skrining KPSP yang tepat</li>
        </ul>
      </div>
    </div>
  );
};

export default Children;