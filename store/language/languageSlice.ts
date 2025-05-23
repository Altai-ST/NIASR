import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { LanguageCode, LanguageState } from '../../types/language';
import { translations } from '../../util/locales/index';

const initialState: LanguageState = {
  currentLanguage: 'ru', 
  supportedLanguages: [
    { code: 'ru', name: 'Русский' },
    { code: 'kg', name: 'Кыргызча' }
  ]
};

export const languageSlice = createSlice({
  name: 'language',    
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.currentLanguage = action.payload;
    }
  }
});

// Export actions and reducer
export const { setLanguage } = languageSlice.actions;

// Selectors
export const selectCurrentLanguage = (state: RootState): LanguageCode => state.language.currentLanguage;
export const selectSupportedLanguages = (state: RootState) => state.language.supportedLanguages;
export const selectTranslations = (state: RootState) => translations[state.language.currentLanguage];

export default languageSlice.reducer;