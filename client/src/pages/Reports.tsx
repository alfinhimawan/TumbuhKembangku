import React from 'react';
import { useChildren } from '../contexts/ChildContext';
import { formatAge, formatDate } from '../utils/helpers';

const Reports: React.FC = () => {
  const { selectedChild } = useChildren();

  // Mock data for screening history (in real app, this would come from API/database)
  const mockScreeningHistory = selectedChild ? [
    {
      id: '1',
      childId: selectedChild.id,
      date: new Date('2024-08-15'),
      ageAtScreening: 15,
      result: 'sesuai' as const,
      score: 8,
      maxScore: 10,
      aspects: {
        motorik_kasar: { score: 2, total: 2 },
        motorik_halus: { score: 2, total: 2 },
        bicara_bahasa: { score: 2, total: 3 },
        sosialisasi_kemandirian: { score: 2, total: 3 }
      }
    },
    {
      id: '2',
      childId: selectedChild.id,
      date: new Date('2024-05-20'),
      ageAtScreening: 12,
      result: 'meragukan' as const,
      score: 6,
      maxScore: 9,
      aspects: {
        motorik_kasar: { score: 2, total: 2 },
        motorik_halus: { score: 1, total: 2 },
        bicara_bahasa: { score: 1, total: 2 },
        sosialisasi_kemandirian: { score: 2, total: 3 }
      }
    }
  ] : [];

  const getResultColor = (result: string) => {
    switch (result) {
      case 'sesuai':
        return 'text-green-600 bg-green-50';
      case 'meragukan':
        return 'text-yellow-600 bg-yellow-50';
      case 'penyimpangan':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getResultLabel = (result: string) => {
    switch (result) {
      case 'sesuai':
        return 'Sesuai';
      case 'meragukan':
        return 'Meragukan';
      case 'penyimpangan':
        return 'Penyimpangan';
      default:
        return result;
    }
  };

  const aspectLabels = {
    motorik_kasar: 'Motorik Kasar',
    motorik_halus: 'Motorik Halus',
    bicara_bahasa: 'Bicara & Bahasa',
    sosialisasi_kemandirian: 'Sosialisasi & Kemandirian'
  };

  const exportToPDF = () => {
    alert('Fitur ekspor PDF akan segera hadir!');
  };

  if (!selectedChild) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pilih Anak Terlebih Dahulu
          </h2>
          <p className="text-gray-600 mb-6">
            Pilih profil anak untuk melihat laporan perkembangan
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Laporan Perkembangan</h1>
            <p className="text-gray-600 mt-1">
              Riwayat dan progress perkembangan {selectedChild.name}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={exportToPDF}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>📄</span>
              <span>Ekspor PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Child Summary Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Anak</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">👶</div>
            <div className="text-sm text-gray-600">Nama</div>
            <div className="font-semibold text-gray-800">{selectedChild.name}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">🎂</div>
            <div className="text-sm text-gray-600">Usia</div>
            <div className="font-semibold text-gray-800">{formatAge(selectedChild.birthDate)}</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm text-gray-600">Total Skrining</div>
            <div className="font-semibold text-gray-800">{mockScreeningHistory.length} kali</div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-sm text-gray-600">Status Terakhir</div>
            <div className={`font-semibold px-2 py-1 rounded-full text-xs ${
              mockScreeningHistory.length > 0 
                ? getResultColor(mockScreeningHistory[0].result)
                : 'text-gray-600 bg-gray-50'
            }`}>
              {mockScreeningHistory.length > 0 
                ? getResultLabel(mockScreeningHistory[0].result)
                : 'Belum Ada'}
            </div>
          </div>
        </div>
      </div>

      {/* Screening History */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Skrining KPSP</h3>
          <a
            href="/screening"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + Skrining Baru
          </a>
        </div>

        {mockScreeningHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Belum Ada Riwayat Skrining
            </h4>
            <p className="text-gray-600 mb-4">
              Mulai dengan melakukan skrining KPSP pertama untuk {selectedChild.name}
            </p>
            <a
              href="/screening"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mulai Skrining
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {mockScreeningHistory.map((screening, index) => (
              <div key={screening.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {index === 0 ? '🆕' : '📋'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        Skrining #{mockScreeningHistory.length - index}
                        {index === 0 && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Terbaru
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(screening.date)} • Usia: {screening.ageAtScreening} bulan
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {screening.score}/{screening.maxScore}
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.round((screening.score / screening.maxScore) * 100)}%
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(screening.result)}`}>
                      {getResultLabel(screening.result)}
                    </div>
                  </div>
                </div>

                {/* Aspect Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(screening.aspects).map(([aspect, data]) => {
                    const percentage = (data.score / data.total) * 100;
                    return (
                      <div key={aspect} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">
                          {aspectLabels[aspect as keyof typeof aspectLabels]}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {data.score}/{data.total}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div
                            className={`h-1 rounded-full ${
                              percentage >= 80 ? 'bg-green-500' :
                              percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafik Perkembangan</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">📈</div>
          <p className="text-gray-600">
            Grafik perkembangan akan tersedia setelah melakukan beberapa kali skrining
          </p>
        </div>
      </div>

      {/* Milestone Tracker Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pencatat Milestone</h3>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">🌟</div>
          <p className="text-gray-600 mb-4">
            Catat momen-momen penting dalam perkembangan {selectedChild.name}
          </p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Tambah Milestone (Coming Soon)
          </button>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-2">📝 Catatan Penting:</h4>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• Lakukan skrining secara berkala setiap 3-6 bulan untuk memantau perkembangan</li>
          <li>• Konsultasikan hasil dengan tenaga kesehatan jika ada kekhawatiran</li>
          <li>• Simpan laporan ini sebagai rekam jejak perkembangan anak</li>
          <li>• Setiap anak berkembang dengan kecepatannya masing-masing</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;