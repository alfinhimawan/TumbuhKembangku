import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChildren } from '../contexts/ChildContext';
import { calculateAge, formatAge } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { children, selectedChild } = useChildren();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getNextScreeningAge = (birthDate: Date) => {
    const age = calculateAge(birthDate);
    const ageInMonths = age.months;
    
    // Screening milestones: 3, 6, 9, 12, 18, 24 months
    const milestones = [3, 6, 9, 12, 18, 24, 30, 36];
    const nextMilestone = milestones.find(m => m > ageInMonths);
    
    return nextMilestone || null;
  };

  const quickActions = [
    {
      title: 'Skrining KPSP',
      description: 'Lakukan skrining perkembangan anak',
      link: '/screening',
      color: 'bg-blue-500',
      icon: '📋'
    },
    {
      title: 'Aktivitas Stimulasi',
      description: 'Temukan aktivitas sesuai usia anak',
      link: '/activities',
      color: 'bg-green-500',
      icon: '🎯'
    },
    {
      title: 'Laporan Perkembangan',
      description: 'Lihat riwayat dan progress anak',
      link: '/reports',
      color: 'bg-purple-500',
      icon: '📊'
    },
    {
      title: 'Kelola Anak',
      description: 'Tambah atau edit profil anak',
      link: '/children',
      color: 'bg-orange-500',
      icon: '👶'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          Selamat datang di TumbuhKembangku - Platform Pantau Tumbuh Kembang Anak
        </p>
      </div>

      {/* Selected Child Info */}
      {selectedChild ? (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Anak Terpilih</h2>
            <Link
              to="/children"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Ganti Anak
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">
                {selectedChild.gender === 'male' ? '👦' : '👧'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedChild.name}
              </h3>
              <p className="text-gray-600">
                Usia: {formatAge(selectedChild.birthDate)}
              </p>
              <p className="text-sm text-gray-500">
                Lahir: {new Date(selectedChild.birthDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Next Screening Reminder */}
          {(() => {
            const nextScreening = getNextScreeningAge(selectedChild.birthDate);
            if (nextScreening) {
              return (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Reminder:</strong> Skrining KPSP selanjutnya disarankan 
                    saat usia {nextScreening} bulan
                  </p>
                </div>
              );
            }
            return null;
          })()}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">👶</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Belum Ada Profil Anak
            </h3>
            <p className="text-gray-600 mb-4">
              Tambahkan profil anak untuk mulai memantau tumbuh kembangnya
            </p>
            <Link
              to="/children"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tambah Profil Anak
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
              {action.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">👶</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Anak</p>
              <p className="text-2xl font-bold text-gray-900">{children.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Skrining Selesai</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* This would come from actual screening data */}
                0
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aktivitas Tersedia</p>
              <p className="text-2xl font-bold text-gray-900">20+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Tips Hari Ini</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Stimulasi Setiap Hari:</strong> Luangkan 15-30 menit setiap hari 
            untuk bermain dan berinteraksi dengan anak. Aktivitas sederhana seperti 
            membaca buku, bernyanyi, atau bermain cilukba sangat bermanfaat untuk 
            perkembangan otak anak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;