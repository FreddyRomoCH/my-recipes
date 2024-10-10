import { useEffect, useMemo, useState } from "react";
import { translateText } from "../services/api/translate"
import { usePreferredLanguage } from "@uidotdev/usehooks";

export function useTranslation (toTranslate) {
    const {language} = usePreferredLanguage()
    const [userLanguage, setUserLanguage] = useState("en")
    const [translation, setTranslation] = useState({})

    useEffect(() => {
        setUserLanguage('es')
    }, [language])

    const translate = async () => {
        const newTranslation = {};
        for (const text of toTranslate) {
          try {
            const result = await translateText(text, userLanguage);
            newTranslation[text] = result || text;
          } catch (error) {
            console.error("Error translating text:", error);
            newTranslation[text] = text; // Fallback to original text on error
          }
        }
        setTranslation(newTranslation);
      };

    useEffect(() => {
        if ( toTranslate.length > 0 ) {
            translate()
        }
    }, [userLanguage])

    const memoTranslation = useMemo(() => translation, [translation])

    const getPreferredLanguage = () => {
        return userLanguage
    }

    return { getPreferredLanguage, translation: memoTranslation }
}