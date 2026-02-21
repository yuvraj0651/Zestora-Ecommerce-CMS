import { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt, className }) => {
    const imgRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (imgRef.current) observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative w-full h-40 overflow-hidden rounded-lg">
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}

            <img
                ref={imgRef}
                src={isVisible ? src : null}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                    }`}
            />
        </div>
    );
};

export default LazyImage;