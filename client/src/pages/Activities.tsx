import React, { useState, useMemo } from 'react';
import { useChildren } from '../contexts/ChildContext';
import { calculateAge } from '../utils/helpers';
import { getActivitiesByAge, stimulationActivities } from '../data/kpspData';

const Activities: React.FC = () => {
  const { selectedChild } = useChildren();
  const [selectedAspect, setSelectedAspect] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const aspects = [
    { value: 'all', label: 'Semua Aspek' },
    { value: 'motorik_kasar', label: 'Motorik Kasar' },
    { value: 'motorik_halus', label: 'Motorik Halus' },
    { value: 'bicara_bahasa', label: 'Bicara & Bahasa' },
    { value: 'sosialisasi_kemandirian', label: 'Sosialisasi & Kemandirian' }
  ];

  const difficulties = [
    { value: 'all', label: 'Semua Level' },
    { value: 'easy', label: 'Mudah' },
    { value: 'medium', label: 'Sedang' },
    { value: 'hard', label: 'Sulit' }
  ];

  const filteredActivities = useMemo(() => {
    let activities = selectedChild 
      ? getActivitiesByAge(calculateAge(selectedChild.birthDate).months)
      : stimulationActivities;

    if (selectedAspect !== 'all') {
      activities = activities.filter(activity => activity.aspect === selectedAspect);
    }

    if (selectedDifficulty !== 'all') {
      activities = activities.filter(activity => activity.difficulty === selectedDifficulty);
    }

    return activities;
  }, [selectedChild, selectedAspect, selectedDifficulty]);

  const getAspectIcon = (aspect: string) => {
    const icons = {
      motorik_kasar: '🏃',
      motorik_halus: '✋',
      bicara_bahasa: '🗣️',
      sosialisasi_kemandirian: '👶'
    };
    return icons[aspect as keyof typeof icons] || '🎯';
  };

  const getAspectColor = (aspect: string) => {
    const colors = {
      motorik_kasar: 'bg-blue-100 text-blue-800',
      motorik_halus: 'bg-green-100 text-green-800',
      bicara_bahasa: 'bg-purple-100 text-purple-800',
      sosialisasi_kemandirian: 'bg-orange-100 text-orange-800'
    };
    return colors[aspect as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: 'Mudah',
      medium: 'Sedang',
      hard: 'Sulit'
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  const toggleExpanded = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId);
  };

  if (!selectedChild) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pilih Anak Terlebih Dahulu
          </h2>
          <p className="text-gray-600 mb-6">
            Pilih profil anak untuk melihat aktivitas stimulasi yang sesuai dengan usianya
          </p>
          <a
            href="/children"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kelola Anak
          </a>
        </div>
      </div>
    );
  }

  const age = calculateAge(selectedChild.birthDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Aktivitas Stimulasi</h1>
            <p className="text-gray-600 mt-1">
              Aktivitas untuk mengoptimalkan perkembangan {selectedChild.name} 
              ({age.months} bulan {age.days} hari)
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {filteredActivities.length} aktivitas tersedia
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Aktivitas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aspek Perkembangan
            </label>
            <select
              value={selectedAspect}
              onChange={(e) => setSelectedAspect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {aspects.map(aspect => (
                <option key={aspect.value} value={aspect.value}>
                  {aspect.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Kesulitan
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activities List */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Tidak Ada Aktivitas
          </h3>
          <p className="text-gray-600">
            Tidak ada aktivitas yang sesuai dengan filter yang dipilih. 
            Coba ubah kriteria pencarian.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Activity Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {getAspectIcon(activity.aspect)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{activity.duration}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAspectColor(activity.aspect)}`}>
                      {aspects.find(a => a.value === activity.aspect)?.label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                      {getDifficultyLabel(activity.difficulty)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {activity.description}
                </p>

                {/* Age Range */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-2">📅</span>
                  Usia: {activity.ageRangeMonths[0]}-{activity.ageRangeMonths[1]} bulan
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpanded(activity.id)}
                  className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  {expandedActivity === activity.id ? '👆 Tutup Detail' : '👇 Lihat Detail'}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedActivity === activity.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  {/* Materials */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">🧸</span>
                      Alat dan Bahan
                    </h4>
                    <ul className="space-y-1">
                      {activity.materials.map((material, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">📝</span>
                      Cara Bermain
                    </h4>
                    <ol className="space-y-2">
                      {activity.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">
          💡 Tips Bermain dengan Anak
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
          <div className="space-y-2">
            <p className="font-medium">• Sesuaikan dengan mood anak</p>
            <p className="text-sm">Pilih waktu saat anak sedang tidak lapar atau mengantuk</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">• Beri pujian dan semangat</p>
            <p className="text-sm">Setiap usaha anak patut diapresiasi</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">• Konsistensi adalah kunci</p>
            <p className="text-sm">Lakukan aktivitas secara rutin untuk hasil optimal</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">• Keamanan prioritas utama</p>
            <p className="text-sm">Selalu dampingi anak saat bermain</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;