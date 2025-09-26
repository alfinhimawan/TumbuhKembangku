import React, { useState, useEffect } from 'react';
import { useChildren } from '../../contexts/ChildContext';
import { Child } from '../../types';

interface EditChildModalProps {
  child: Child | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditChildModal: React.FC<EditChildModalProps> = ({ child, isOpen, onClose }) => {
  const { updateChild } = useChildren();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '' as 'male' | 'female' | ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when child prop changes
  useEffect(() => {
    if (child) {
      setFormData({
        name: child.name,
        birthDate: new Date(child.birthDate).toISOString().split('T')[0],
        gender: child.gender
      });
      setErrors({});
    }
  }, [child]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      newErrors.name = 'Nama anak harus diisi';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir harus diisi';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthDate = 'Tanggal lahir tidak boleh di masa depan';
      }
      
      // Check if child is too old (over 6 years)
      const ageInYears = (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (ageInYears > 6) {
        newErrors.birthDate = 'Aplikasi ini untuk anak usia 0-6 tahun';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Jenis kelamin harus dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!child || !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateChild(child.id, {
        name: formData.name.trim(),
        birthDate: new Date(formData.birthDate),
        gender: formData.gender as 'male' | 'female'
      });
      
      onClose();
    } catch (error) {
      setErrors({ general: 'Terjadi kesalahan saat menyimpan data' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !child) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Profil Anak</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="editName" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Anak *
            </label>
            <input
              id="editName"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-300 bg-red-50' : ''
              }`}
              placeholder="Masukkan nama anak"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Birth Date */}
          <div>
            <label htmlFor="editBirthDate" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir *
            </label>
            <input
              id="editBirthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]} // Today's date as max
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.birthDate ? 'border-red-300 bg-red-50' : ''
              }`}
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="editGender" className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin *
            </label>
            <select
              id="editGender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.gender ? 'border-red-300 bg-red-50' : ''
              }`}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
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

        {/* Warning */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-700">
            <strong>Peringatan:</strong> Mengubah tanggal lahir akan mempengaruhi 
            jenis skrining KPSP dan rekomendasi aktivitas yang diberikan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditChildModal;