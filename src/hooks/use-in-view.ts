import { useState, useEffect, useRef } from 'react';

export const useInView = (options: IntersectionObserverInit = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    });

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect(); // Trigger once
            }
        }, optionsRef.current);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []); // Run once on mount (and when ref changes, but ref is stable)

    return { ref, isInView };
};
