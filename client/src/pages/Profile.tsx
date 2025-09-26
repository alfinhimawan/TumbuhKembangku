import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChildren } from '../contexts/ChildContext';
import { isValidEmail } from '../utils/helpers';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { children } = useChildren();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama harus diisi';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (formData.phone && !/^08\d{8,11}$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor HP tidak valid (contoh: 08123456789)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would update user data via API
      setIsEditing(false);
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      setErrors({ general: 'Terjadi kesalahan saat menyimpan data' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setErrors({});
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">👤</div>
        <p className="text-gray-600">Silakan login terlebih dahulu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profil Pengguna</h1>
            <p className="text-gray-600 mt-1">Kelola informasi akun dan preferensi Anda</p>
          </div>
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Informasi Pribadi</h2>
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              ✏️ Edit Profil
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                id="profileName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-300 bg-red-50' : ''
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="profileEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                id="profileEmail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300 bg-red-50' : ''
                }`}
                placeholder="Masukkan email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="profilePhone" className="block text-sm font-medium text-gray-700 mb-2">
                Nomor HP
              </label>
              <input
                id="profilePhone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-300 bg-red-50' : ''
                }`}
                placeholder="08123456789"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Menyimpan...</span>
                  </div>
                ) : (
                  'Simpan Perubahan'
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Nama Lengkap</label>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Nomor HP</label>
                <p className="text-gray-900 font-medium">{user.phone || '-'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Bergabung Sejak</label>
                <p className="text-gray-900 font-medium">
                  {new Date(user.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Children Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ringkasan Anak</h2>
        
        {children.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👶</div>
            <p className="text-gray-600 mb-4">Belum ada profil anak yang ditambahkan</p>
            <a
              href="/children"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tambah Profil Anak
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child) => (
              <div key={child.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">
                    {child.gender === 'male' ? '👦' : '👧'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{child.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date().getFullYear() - new Date(child.birthDate).getFullYear()} tahun
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Lahir: {new Date(child.birthDate).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistik Penggunaan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">👶</div>
            <div className="text-2xl font-bold text-blue-600">{children.length}</div>
            <div className="text-sm text-gray-600">Total Anak</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Skrining Selesai</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Aktivitas Dilakukan</div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pengaturan Akun</h2>
        
        <div className="space-y-3">
          <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-left">
            🔔 Atur Notifikasi (Coming Soon)
          </button>
          
          <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-left">
            📱 Ekspor Data (Coming Soon)
          </button>
          
          <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-left">
            🔒 Ubah Password (Coming Soon)
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Zona Bahaya</h2>
        <p className="text-red-700 mb-4">
          Keluar dari akun akan menghapus data sesi Anda dari perangkat ini.
        </p>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          🚪 Keluar dari Akun
        </button>
      </div>
    </div>
  );
};

export default Profile;