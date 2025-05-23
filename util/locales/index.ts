import { Translations } from '../../types/language';
import { ruTranslations } from './ru';
import { kgTranslations } from './kg';

export const translations: Record<string, Translations> = {
  ru: ruTranslations,
  kg: kgTranslations
};