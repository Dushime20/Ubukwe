'use client';

import { useI18n } from '@/contexts/i18n-context';

export function useTranslation() {
  const { language, setLanguage, t, tSync } = useI18n();

  const translateBatch = async (texts: string[]) => {
    return Promise.all(texts.map(text => t(text)));
  };

  return { language, setLanguage, t, tSync, translateBatch };
}
