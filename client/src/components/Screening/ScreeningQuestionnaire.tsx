import React from 'react';
import { KPSPQuestion } from '../../types';

interface ScreeningQuestionnaireProps {
  question: KPSPQuestion;
  currentIndex: number;
  totalQuestions: number;
  answer?: boolean;
  onAnswer: (questionId: string, answer: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const ScreeningQuestionnaire: React.FC<ScreeningQuestionnaireProps> = ({
  question,
  currentIndex,
  totalQuestions,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const handleAnswer = (value: boolean) => {
    onAnswer(question.id, value);
  };

  const getAspectLabel = (aspect: string) => {
    const labels = {
      motorik_kasar: 'Motorik Kasar',
      motorik_halus: 'Motorik Halus',
      bicara_bahasa: 'Bicara & Bahasa',
      sosialisasi_kemandirian: 'Sosialisasi & Kemandirian'
    };
    return labels[aspect as keyof typeof labels] || aspect;
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

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Progress Bar */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Pertanyaan {currentIndex + 1} dari {totalQuestions}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAspectColor(question.aspect)}`}>
            {getAspectLabel(question.aspect)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Question Icon */}
          <div className="text-6xl mb-6">
            {question.aspect === 'motorik_kasar' && '🏃'}
            {question.aspect === 'motorik_halus' && '✋'}
            {question.aspect === 'bicara_bahasa' && '🗣️'}
            {question.aspect === 'sosialisasi_kemandirian' && '👶'}
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
            {question.question}
          </h2>

          {/* Question Description */}
          {question.description && (
            <p className="text-gray-600 mb-8 leading-relaxed">
              {question.description}
            </p>
          )}

          {/* Answer Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => handleAnswer(true)}
              className={`px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                answer === true
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-md'
              }`}
            >
              ✓ Ya
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                answer === false
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-md'
              }`}
            >
              ✗ Tidak
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                canGoPrevious
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              ← Sebelumnya
            </button>

            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                canGoNext
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentIndex === totalQuestions - 1 ? 'Selesai' : 'Selanjutnya →'}
            </button>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <p className="text-center text-sm text-blue-700">
          💡 <strong>Tips:</strong> Jawab berdasarkan kemampuan anak saat ini. 
          Jika ragu, pilih jawaban yang paling mendekati kondisi sebenarnya.
        </p>
      </div>
    </div>
  );
};

export default ScreeningQuestionnaire;