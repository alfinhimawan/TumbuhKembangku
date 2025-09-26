import React, { useState, useEffect } from 'react';
import { useChildren } from '../contexts/ChildContext';
import { calculateAge, calculateKPSPResult, getRecommendations } from '../utils/helpers';
import { getKPSPByAge } from '../data/kpspData';
import { KPSPQuestion, ScreeningResult } from '../types';
import ScreeningQuestionnaire from '../components/Screening/ScreeningQuestionnaire';
import ScreeningResults from '../components/Screening/ScreeningResults';

const Screening: React.FC = () => {
  const { selectedChild } = useChildren();
  const [currentStep, setCurrentStep] = useState<'start' | 'questions' | 'results'>('start');
  const [questions, setQuestions] = useState<KPSPQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: boolean }>({});
  const [screeningResult, setScreeningResult] = useState<ScreeningResult | null>(null);

  useEffect(() => {
    // Reset when child changes
    setCurrentStep('start');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setScreeningResult(null);
  }, [selectedChild]);

  const startScreening = () => {
    if (!selectedChild) return;

    const age = calculateAge(selectedChild.birthDate);
    const ageInMonths = age.months;
    const availableQuestions = getKPSPByAge(ageInMonths);

    if (availableQuestions.length === 0) {
      alert('Belum ada skrining KPSP yang tersedia untuk usia ini');
      return;
    }

    setQuestions(availableQuestions);
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered, calculate results
      finishScreening();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishScreening = () => {
    if (!selectedChild) return;

    const age = calculateAge(selectedChild.birthDate);
    const result = calculateKPSPResult(answers, questions.length);
    const recommendations = getRecommendations(answers, questions);

    const screeningData: ScreeningResult = {
      id: Date.now().toString(),
      childId: selectedChild.id,
      ageAtScreeningMonths: age.months,
      questions,
      answers,
      result: result.result,
      score: result.score,
      maxScore: result.maxScore,
      recommendations,
      createdAt: new Date()
    };

    setScreeningResult(screeningData);
    setCurrentStep('results');
  };

  const startNewScreening = () => {
    setCurrentStep('start');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setScreeningResult(null);
  };

  if (!selectedChild) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👶</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pilih Anak Terlebih Dahulu
          </h2>
          <p className="text-gray-600 mb-6">
            Anda perlu memilih profil anak untuk melakukan skrining KPSP
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
  const availableQuestions = getKPSPByAge(age.months);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Skrining KPSP</h1>
            <p className="text-gray-600 mt-1">
              Kuesioner Pra Skrining Perkembangan untuk {selectedChild.name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Usia Anak</div>
            <div className="text-lg font-semibold text-blue-600">
              {age.months} bulan {age.days} hari
            </div>
          </div>
        </div>
      </div>

      {/* Content based on current step */}
      {currentStep === 'start' && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Siap Memulai Skrining?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Skrining KPSP akan membantu Anda mengetahui apakah perkembangan anak 
              sesuai dengan tahapan usianya. Tes ini terdiri dari beberapa pertanyaan 
              sederhana tentang kemampuan anak.
            </p>

            {availableQuestions.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  Belum ada skrining KPSP yang tersedia untuk usia {age.months} bulan. 
                  Skrining tersedia untuk usia 3, 6, 9, 12, dan 18 bulan.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-800 mb-2">Informasi Skrining:</h3>
                  <ul className="text-blue-700 text-sm space-y-1 text-left max-w-md mx-auto">
                    <li>• Jumlah pertanyaan: {availableQuestions.length} pertanyaan</li>
                    <li>• Waktu yang dibutuhkan: sekitar 5-10 menit</li>
                    <li>• Jawab dengan jujur berdasarkan kemampuan anak saat ini</li>
                    <li>• Tidak ada jawaban yang benar atau salah</li>
                  </ul>
                </div>

                <button
                  onClick={startScreening}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  Mulai Skrining
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {currentStep === 'questions' && questions.length > 0 && (
        <ScreeningQuestionnaire
          question={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          answer={answers[questions[currentQuestionIndex].id]}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          canGoNext={answers[questions[currentQuestionIndex].id] !== undefined}
          canGoPrevious={currentQuestionIndex > 0}
        />
      )}

      {currentStep === 'results' && screeningResult && (
        <ScreeningResults
          result={screeningResult}
          child={selectedChild}
          onStartNew={startNewScreening}
        />
      )}

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          💡 Tentang Skrining KPSP
        </h3>
        <div className="text-blue-700 space-y-3">
          <p>
            <strong>KPSP (Kuesioner Pra Skrining Perkembangan)</strong> adalah alat 
            skrining yang digunakan untuk mendeteksi dini gangguan perkembangan pada anak.
          </p>
          <p>
            Skrining ini menilai 4 aspek perkembangan:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Motorik Kasar:</strong> gerakan tubuh yang menggunakan otot-otot besar</li>
            <li><strong>Motorik Halus:</strong> gerakan yang menggunakan otot-otot kecil atau halus</li>
            <li><strong>Bicara & Bahasa:</strong> kemampuan untuk mengerti dan menggunakan bahasa</li>
            <li><strong>Sosialisasi & Kemandirian:</strong> kemampuan mandiri, bersosialisasi dan berperilaku sesuai norma</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Screening;