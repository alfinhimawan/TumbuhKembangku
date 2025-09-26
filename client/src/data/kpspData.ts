import { KPSPQuestion, Activity } from '../types';

export const kpspQuestions: KPSPQuestion[] = [
  // 0-3 months
  {
    id: 'kpsp_0_1',
    ageRangeMonths: [0, 3],
    aspect: 'motorik_kasar',
    question: 'Apakah bayi dapat mengangkat kepalanya saat tengkurap?',
    description: 'Letakkan bayi dalam posisi tengkurap, amati apakah bayi dapat mengangkat kepala sebentar'
  },
  {
    id: 'kpsp_0_2',
    ageRangeMonths: [0, 3],
    aspect: 'motorik_halus',
    question: 'Apakah bayi dapat mengikuti gerakan dengan mata?',
    description: 'Gerakkan mainan atau wajah Anda di depan bayi, amati apakah mata bayi mengikuti'
  },
  {
    id: 'kpsp_0_3',
    ageRangeMonths: [0, 3],
    aspect: 'bicara_bahasa',
    question: 'Apakah bayi mengeluarkan suara selain menangis?',
    description: 'Amati apakah bayi mengeluarkan suara "aah", "ooh" atau suara lainnya'
  },
  {
    id: 'kpsp_0_4',
    ageRangeMonths: [0, 3],
    aspect: 'sosialisasi_kemandirian',
    question: 'Apakah bayi tersenyum saat diajak bicara?',
    description: 'Ajak bayi bicara dengan suara lembut, amati apakah bayi memberikan respons senyuman'
  },

  // 3-6 months
  {
    id: 'kpsp_3_1',
    ageRangeMonths: [3, 6],
    aspect: 'motorik_kasar',
    question: 'Apakah bayi dapat tengkurap dan menahan kepala tegak?',
    description: 'Bayi dapat menahan kepala tegak ketika dalam posisi tengkurap'
  },
  {
    id: 'kpsp_3_2',
    ageRangeMonths: [3, 6],
    aspect: 'motorik_halus',
    question: 'Apakah bayi dapat memegang mainan yang diberikan?',
    description: 'Berikan mainan ringan ke tangan bayi, amati apakah bayi dapat memegangnya'
  },
  {
    id: 'kpsp_3_3',
    ageRangeMonths: [3, 6],
    aspect: 'bicara_bahasa',
    question: 'Apakah bayi tertawa keras dan berteriak gembira?',
    description: 'Amati apakah bayi menunjukkan ekspresi gembira dengan suara'
  },
  {
    id: 'kpsp_3_4',
    ageRangeMonths: [3, 6],
    aspect: 'sosialisasi_kemandirian',
    question: 'Apakah bayi suka melihat dan bermain dengan tangannya?',
    description: 'Amati apakah bayi tertarik melihat dan menggerak-gerakkan tangannya'
  },

  // 6-9 months
  {
    id: 'kpsp_6_1',
    ageRangeMonths: [6, 9],
    aspect: 'motorik_kasar',
    question: 'Apakah bayi dapat duduk tanpa dibantu?',
    description: 'Bayi dapat duduk tegak tanpa bantuan atau pegangan'
  },
  {
    id: 'kpsp_6_2',
    ageRangeMonths: [6, 9],
    aspect: 'motorik_halus',
    question: 'Apakah bayi dapat memindahkan mainan dari tangan satu ke tangan lain?',
    description: 'Berikan mainan kecil, amati apakah bayi dapat memindahkannya antar tangan'
  },
  {
    id: 'kpsp_6_3',
    ageRangeMonths: [6, 9],
    aspect: 'bicara_bahasa',
    question: 'Apakah bayi mengeluarkan suara tanpa arti ma..ma.., da..da.., ba..ba..?',
    description: 'Amati apakah bayi sudah mulai babbling dengan suku kata berulang'
  },
  {
    id: 'kpsp_6_4',
    ageRangeMonths: [6, 9],
    aspect: 'sosialisasi_kemandirian',
    question: 'Apakah bayi dapat memegang dan makan biskuit sendiri?',
    description: 'Berikan biskuit bayi, amati apakah bayi dapat memegang dan mencoba memakannya'
  },

  // 9-12 months
  {
    id: 'kpsp_9_1',
    ageRangeMonths: [9, 12],
    aspect: 'motorik_kasar',
    question: 'Apakah bayi dapat berdiri dengan berpegangan?',
    description: 'Amati apakah bayi dapat berdiri sambil berpegangan pada furniture atau tangan orang dewasa'
  },
  {
    id: 'kpsp_9_2',
    ageRangeMonths: [9, 12],
    aspect: 'motorik_halus',
    question: 'Apakah bayi dapat mengambil benda kecil dengan ibu jari dan jari telunjuk?',
    description: 'Berikan makanan kecil seperti puff atau sereal, amati cara bayi mengambilnya'
  },
  {
    id: 'kpsp_9_3',
    ageRangeMonths: [9, 12],
    aspect: 'bicara_bahasa',
    question: 'Apakah bayi dapat mengatakan mama atau dada dengan arti?',
    description: 'Amati apakah bayi sudah dapat memanggil mama/dada dengan maksud memanggil orang tua'
  },
  {
    id: 'kpsp_9_4',
    ageRangeMonths: [9, 12],
    aspect: 'sosialisasi_kemandirian',
    question: 'Apakah bayi dapat bermain cilukba atau tepuk tangan?',
    description: 'Ajak bayi bermain cilukba atau tepuk tangan, amati responsnya'
  },

  // 12-18 months
  {
    id: 'kpsp_12_1',
    ageRangeMonths: [12, 18],
    aspect: 'motorik_kasar',
    question: 'Apakah anak dapat berjalan tanpa dibantu?',
    description: 'Amati apakah anak sudah dapat berjalan sendiri tanpa bantuan'
  },
  {
    id: 'kpsp_12_2',
    ageRangeMonths: [12, 18],
    aspect: 'motorik_halus',
    question: 'Apakah anak dapat mencoret-coret pensil pada kertas?',
    description: 'Berikan pensil dan kertas, amati apakah anak tertarik mencoret-coret'
  },
  {
    id: 'kpsp_12_3',
    ageRangeMonths: [12, 18],
    aspect: 'bicara_bahasa',
    question: 'Apakah anak dapat mengucapkan paling sedikit 3 kata yang bermakna?',
    description: 'Kata seperti mama, papa, mam (makan), susu, dll'
  },
  {
    id: 'kpsp_12_4',
    ageRangeMonths: [12, 18],
    aspect: 'sosialisasi_kemandirian',
    question: 'Apakah anak dapat minum dari cangkir dan makan sendiri?',
    description: 'Amati kemampuan anak minum dari cangkir dan makan dengan tangannya'
  }
];

export const stimulationActivities: Activity[] = [
  // 0-3 months activities
  {
    id: 'act_0_1',
    title: 'Tummy Time',
    description: 'Latihan tengkurap untuk memperkuat otot leher dan punggung',
    ageRangeMonths: [0, 3],
    aspect: 'motorik_kasar',
    materials: ['Selimut lembut', 'Mainan berwarna cerah'],
    instructions: [
      'Letakkan bayi dalam posisi tengkurap di atas selimut',
      'Tempatkan mainan berwarna cerah di depan bayi',
      'Dampingi bayi selama 3-5 menit',
      'Lakukan 2-3 kali sehari'
    ],
    duration: '5-10 menit',
    difficulty: 'easy'
  },
  {
    id: 'act_0_2',
    title: 'Visual Tracking',
    description: 'Melatih kemampuan mata mengikuti gerakan',
    ageRangeMonths: [0, 3],
    aspect: 'motorik_halus',
    materials: ['Mainan berwarna kontras', 'Kartu hitam-putih'],
    instructions: [
      'Pegang mainan 20-30 cm dari wajah bayi',
      'Gerakkan mainan perlahan dari kiri ke kanan',
      'Perhatikan apakah mata bayi mengikuti',
      'Ulangi dengan gerakan naik-turun'
    ],
    duration: '3-5 menit',
    difficulty: 'easy'
  },

  // 3-6 months activities
  {
    id: 'act_3_1',
    title: 'Bermain dengan Mainan Rattle',
    description: 'Melatih koordinasi tangan dan pendengaran',
    ageRangeMonths: [3, 6],
    aspect: 'motorik_halus',
    materials: ['Rattle atau mainan bersuara', 'Mainan tekstur berbeda'],
    instructions: [
      'Berikan rattle ke tangan bayi',
      'Bantu bayi menggoyang-goyangkan mainan',
      'Biarkan bayi eksplorasi dengan kedua tangan',
      'Ganti dengan mainan tekstur berbeda'
    ],
    duration: '10-15 menit',
    difficulty: 'easy'
  },
  {
    id: 'act_3_2',
    title: 'Bernyanyi dan Berbicara',
    description: 'Stimulasi perkembangan bahasa dan komunikasi',
    ageRangeMonths: [3, 6],
    aspect: 'bicara_bahasa',
    materials: ['Suara Anda', 'Lagu anak-anak'],
    instructions: [
      'Nyanyikan lagu sederhana dengan nada lembut',
      'Ajak bayi "ngobrol" dengan suara-suara lucu',
      'Tiru suara yang dibuat bayi',
      'Berikan jeda untuk bayi merespons'
    ],
    duration: '15-20 menit',
    difficulty: 'easy'
  },

  // 6-9 months activities
  {
    id: 'act_6_1',
    title: 'Bermain Cilukba',
    description: 'Mengembangkan kemampuan sosial dan kognitif',
    ageRangeMonths: [6, 9],
    aspect: 'sosialisasi_kemandirian',
    materials: ['Tangan atau kain kecil'],
    instructions: [
      'Tutup wajah dengan tangan atau kain',
      'Katakan "cilukba!" sambil membuka tutupan',
      'Perhatikan reaksi dan senyuman bayi',
      'Ulangi beberapa kali dengan variasi'
    ],
    duration: '5-10 menit',
    difficulty: 'easy'
  },
  {
    id: 'act_6_2',
    title: 'Finger Food Exploration',
    description: 'Melatih motorik halus dan kemandirian makan',
    ageRangeMonths: [6, 9],
    aspect: 'motorik_halus',
    materials: ['Potongan buah lunak', 'Biskuit bayi', 'Baby puff'],
    instructions: [
      'Potong makanan menjadi ukuran yang aman',
      'Letakkan di depan bayi',
      'Biarkan bayi eksplorasi dengan tangannya',
      'Dampingi selalu saat makan'
    ],
    duration: '15-20 menit',
    difficulty: 'medium'
  },

  // 9-12 months activities
  {
    id: 'act_9_1',
    title: 'Cruising Practice',
    description: 'Melatih kemampuan berdiri dan berjalan',
    ageRangeMonths: [9, 12],
    aspect: 'motorik_kasar',
    materials: ['Sofa atau furniture rendah', 'Mainan menarik'],
    instructions: [
      'Letakkan mainan di ujung sofa',
      'Bantu bayi berdiri di ujung yang satu',
      'Motivasi bayi untuk bergerak ke mainan',
      'Berikan pujian setiap kemajuan'
    ],
    duration: '15-20 menit',
    difficulty: 'medium'
  },
  {
    id: 'act_9_2',
    title: 'Simple Commands',
    description: 'Melatih pemahaman bahasa sederhana',
    ageRangeMonths: [9, 12],
    aspect: 'bicara_bahasa',
    materials: ['Mainan favorit', 'Bola kecil'],
    instructions: [
      'Minta bayi "berikan" mainan dengan gestur',
      'Gunakan kata sederhana seperti "ambil", "berikan"',
      'Tunjukkan contoh gerakan yang diinginkan',
      'Berikan pujian saat bayi merespons'
    ],
    duration: '10-15 menit',
    difficulty: 'medium'
  },

  // 12-18 months activities
  {
    id: 'act_12_1',
    title: 'Menggambar Bebas',
    description: 'Mengembangkan kreativitas dan motorik halus',
    ageRangeMonths: [12, 18],
    aspect: 'motorik_halus',
    materials: ['Crayon besar', 'Kertas besar', 'Meja rendah'],
    instructions: [
      'Berikan crayon yang mudah digenggam',
      'Tunjukkan cara memegang crayon',
      'Biarkan anak eksplorasi membuat goresan',
      'Berikan pujian untuk setiap usaha'
    ],
    duration: '15-20 menit',
    difficulty: 'medium'
  },
  {
    id: 'act_12_2',
    title: 'Bermain Peran Sederhana',
    description: 'Mengembangkan imajinasi dan kemampuan sosial',
    ageRangeMonths: [12, 18],
    aspect: 'sosialisasi_kemandirian',
    materials: ['Boneka', 'Peralatan makan mainan', 'Telepon mainan'],
    instructions: [
      'Contohkan cara "memberi makan" boneka',
      'Ajak anak "telepon-teleponan"',
      'Biarkan anak meniru aktivitas sehari-hari',
      'Berikan narasi sederhana saat bermain'
    ],
    duration: '20-30 menit',
    difficulty: 'medium'
  }
];

// Helper function untuk mendapatkan pertanyaan berdasarkan usia
export const getKPSPByAge = (ageInMonths: number): KPSPQuestion[] => {
  return kpspQuestions.filter(q => 
    ageInMonths >= q.ageRangeMonths[0] && ageInMonths <= q.ageRangeMonths[1]
  );
};

// Helper function untuk mendapatkan aktivitas berdasarkan usia
export const getActivitiesByAge = (ageInMonths: number): Activity[] => {
  return stimulationActivities.filter(a => 
    ageInMonths >= a.ageRangeMonths[0] && ageInMonths <= a.ageRangeMonths[1]
  );
};