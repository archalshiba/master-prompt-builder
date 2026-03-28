export const translations = {
  en: {
    app: {
      title: 'Master Prompt Builder',
      subtitle: 'Vibe Coding Command Center',
    },
    idea: {
      title: 'Your Idea',
      placeholder: 'Describe your app idea here...\n\nExample: A habit tracker for remote workers with team challenges, social accountability, and progress visualization',
      chars: 'chars',
    },
    critique: {
      title: 'Analysis Results',
      insights: 'insights',
    },
    actions: {
      analyze: 'Analyze Idea',
      generate: 'Generate',
      export: 'Export',
      exporting: 'Exporting...',
      copy: 'Copy',
      copied: 'Copied!',
      saveVersion: 'Save Version',
      loadVersion: 'Load Version',
    },
    refine: {
      title: 'Refine',
      settings: 'Settings',
      techStack: 'Tech Stack',
      complexity: 'Complexity Level',
      audience: 'Target Audience',
    },
    complexity: {
      simple: 'Simple MVP',
      medium: 'Medium',
      advanced: 'Advanced',
    },
    outputs: {
      title: 'Outputs',
      noOutputs: 'No outputs generated yet. Enter your idea and click "Analyze Idea" to start.',
      chars: 'chars',
      package: 'Package includes 6 files ready for download',
    },
    trace: {
      title: 'Execution Trace',
      entries: 'entries',
      noTrace: 'No actions yet. Start by analyzing your idea.',
      more: 'more entries. Click to expand.',
    },
    auth: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
    },
    errors: {
      generic: 'Something went wrong. Please try again.',
      noIdea: 'Please enter your idea first.',
    },
  },
  ar: {
    app: {
      title: 'منشئ الأوامر الرئيسية',
      subtitle: 'مركز قيادة Vibe Coding',
    },
    idea: {
      title: 'فكرتك',
      placeholder: 'صف فكرة تطبيقك هنا...\n\nمثال: تطبيق تتبع العادات للعمال عن بُعد مع تحديات الفريق والمساءلة الاجتماعية وتتبع التقدم',
      chars: 'حرف',
    },
    critique: {
      title: 'نتائج التحليل',
      insights: 'رؤى',
    },
    actions: {
      analyze: 'تحليل الفكرة',
      generate: 'إنشاء',
      export: 'تصدير',
      exporting: 'جاري التصدير...',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      saveVersion: 'حفظ الإصدار',
      loadVersion: 'تحميل الإصدار',
    },
    refine: {
      title: 'تحسين',
      settings: 'الإعدادات',
      techStack: 'تقنيات البرمجة',
      complexity: 'مستوى التعقيد',
      audience: 'الجمهور المستهدف',
    },
    complexity: {
      simple: 'MVP بسيط',
      medium: 'متوسط',
      advanced: 'متقدم',
    },
    outputs: {
      title: 'المخرجات',
      noOutputs: 'لم يتم إنشاء مخرجات بعد. أدخل فكرتك وانقر على "تحليل الفكرة" للبدء.',
      chars: 'حرف',
      package: 'الحزمة تتضمن 6 ملفات جاهزة للتحميل',
    },
    trace: {
      title: 'سجل التنفيذ',
      entries: 'إدخالات',
      noTrace: 'لا توجد إجراءات بعد. ابدأ بتحليل فكرتك.',
      more: 'المزيد من الإدخالات. انقر للتوسيع.',
    },
    auth: {
      signIn: 'تسجيل الدخول',
      signOut: 'تسجيل الخروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
    },
    errors: {
      generic: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      noIdea: 'يرجى إدخال فكرتك أولاً.',
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
