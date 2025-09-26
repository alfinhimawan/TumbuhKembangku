import React from 'react';
import { ScreeningResult, Child } from '../../types';
import { formatDate } from '../../utils/helpers';

interface ScreeningResultsProps {
  result: ScreeningResult;
  child: Child;
  onStartNew: () => void;
}

const ScreeningResults: React.FC<ScreeningResultsProps> = ({
  result,
  child,
  onStartNew
}) => {
  const getResultIcon = () => {
    switch (result.result) {
      case 'sesuai':
        return '🎉';
      case 'meragukan':
        return '⚠️';
      case 'penyimpangan':
        return '🚨';
      default:
        return '📊';
    }
  };

  const getResultColor = () => {
    switch (result.result) {
      case 'sesuai':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'meragukan':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'penyimpangan':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getResultTitle = () => {
    switch (result.result) {
      case 'sesuai':
        return 'Perkembangan Sesuai';
      case 'meragukan':
        return 'Perkembangan Meragukan';
      case 'penyimpangan':
        return 'Terindikasi Penyimpangan';
      default:
        return 'Hasil Skrining';
    }
  };

  const getResultMessage = () => {
    switch (result.result) {
      case 'sesuai':
        return `Selamat! Perkembangan ${child.name} sesuai dengan tahapan usianya. Teruskan stimulasi dan pantau perkembangan secara berkala.`;
      case 'meragukan':
        return `Perkembangan ${child.name} memerlukan perhatian lebih. Lakukan stimulasi yang lebih intensif dan konsultasikan dengan tenaga kesehatan jika perlu.`;
      case 'penyimpangan':
        return `Perkembangan ${child.name} memerlukan evaluasi lebih lanjut. Disarankan untuk segera berkonsultasi dengan dokter anak atau tenaga kesehatan profesional.`;
      default:
        return 'Hasil skrining telah selesai.';
    }
  };

  const getAspectResults = () => {
    const aspects = ['motorik_kasar', 'motorik_halus', 'bicara_bahasa', 'sosialisasi_kemandirian'];
    const aspectLabels = {
      motorik_kasar: 'Motorik Kasar',
      motorik_halus: 'Motorik Halus',
      bicara_bahasa: 'Bicara & Bahasa',
      sosialisasi_kemandirian: 'Sosialisasi & Kemandirian'
    };
    
    return aspects.map(aspect => {
      const aspectQuestions = result.questions.filter(q => q.aspect === aspect);
      const aspectAnswers = aspectQuestions.filter(q => result.answers[q.id] === true);
      const percentage = aspectQuestions.length > 0 ? (aspectAnswers.length / aspectQuestions.length) * 100 : 0;
      
      return {
        aspect,
        label: aspectLabels[aspect as keyof typeof aspectLabels],
        score: aspectAnswers.length,
        total: aspectQuestions.length,
        percentage: Math.round(percentage)
      };
    }).filter(item => item.total > 0);
  };

  const generatePDFReport = () => {
    // This would implement PDF generation
    // For now, we'll show an alert
    alert('Fitur ekspor PDF akan segera hadir!');
  };

  const aspectResults = getAspectResults();

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className={`rounded-xl p-8 border ${getResultColor()}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{getResultIcon()}</div>
          <h2 className="text-2xl font-bold mb-2">{getResultTitle()}</h2>
          <div className="text-4xl font-bold mb-4">
            {result.score}/{result.maxScore}
          </div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            {getResultMessage()}
          </p>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Detail Hasil per Aspek</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aspectResults.map(({ aspect, label, score, total, percentage }) => {
            const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red';
            const colorClasses = {
              green: 'bg-green-100 text-green-800 border-green-200',
              yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
              red: 'bg-red-100 text-red-800 border-red-200'
            };
            
            return (
              <div key={aspect} className={`p-4 rounded-lg border ${colorClasses[color]}`}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{label}</h4>
                  <span className="text-sm font-medium">{score}/{total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      color === 'green' ? 'bg-green-500' :
                      color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">{percentage}% tercapai</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Rekomendasi</h3>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-blue-800 leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartNew}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            🔄 Mulai Skrining Baru
          </button>
          
          <button
            onClick={generatePDFReport}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            📄 Unduh Laporan PDF
          </button>
          
          <a
            href="/activities"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-center"
          >
            🎯 Lihat Aktivitas Stimulasi
          </a>
        </div>
      </div>

      {/* Screening Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Skrining</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Anak:</strong> {child.name}
          </div>
          <div>
            <strong>Usia saat skrining:</strong> {result.ageAtScreeningMonths} bulan
          </div>
          <div>
            <strong>Tanggal skrining:</strong> {formatDate(result.createdAt)}
          </div>
          <div>
            <strong>Jenis kelamin:</strong> {child.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Penting untuk Diingat:</h4>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• Hasil skrining ini bukan diagnosis medis</li>
          <li>• Konsultasikan hasil dengan tenaga kesehatan profesional</li>
          <li>• Lakukan skrining secara berkala setiap 3-6 bulan</li>
          <li>• Setiap anak berkembang dengan kecepatan yang berbeda</li>
        </ul>
      </div>
    </div>
  );
};

export default ScreeningResults;