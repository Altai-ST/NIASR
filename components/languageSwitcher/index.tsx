import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  setLanguage, 
  selectCurrentLanguage, 
  selectSupportedLanguages 
} from '../../store/language/languageSlice';
import { Button } from '../registry/new-york-v4/ui/button';

const LanguageSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const supportedLanguages = useAppSelector(selectSupportedLanguages);
  
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "ru" ? "kg" : "ru";

    dispatch(setLanguage(newLanguage));
  };

  const nextLanguage = supportedLanguages.find(
    (lang) => lang.code !== currentLanguage
  );
  
  return (
    <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="text-white hover:text-white hover:bg-blue-600"
          onClick={handleLanguageChange}
        >
          {nextLanguage?.name}
        </Button>
    </div>
  );
};

export default LanguageSwitcher;