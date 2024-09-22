import { useEffect, useState } from "react";

export function usePageLoaded () {
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const handleLoading = () => {
            setIsPageLoaded(true)
        }

        window.addEventListener('load', handleLoading)

        return () => {
            window.removeEventListener('load', handleLoading)
        }
    }, []);

    return { isPageLoaded }
}