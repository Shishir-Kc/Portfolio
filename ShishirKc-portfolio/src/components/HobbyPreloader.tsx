"use client";

import React, { useEffect, useState } from "react";

const models = [
    "https://my.spline.design/macbookproblue-4EKvZBxHa81YBIg5T6uuafmU/",
    "https://my.spline.design/artoffocusbook-lmY0jJgLJB82xUFpzzrEPjDq/",
    "https://my.spline.design/campfire-yA0hUG5XaE6v3UeoAYNJ9w6v/",
    "https://my.spline.design/nexbotrobotcharacterconcept-9KoC22EYuI2vCtcLwOjIxSQG/",
    "https://my.spline.design/honoringredbullracing-5nFgGm20ucedapO4Ec5MwJLL/"
];

export const HobbyPreloader = () => {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // Delay loading slightly to prioritize main page content
        const timer = setTimeout(() => {
            setShouldLoad(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!shouldLoad) return null;

    return (
        <div className="fixed bottom-0 left-0 w-0 h-0 overflow-hidden pointer-events-none opacity-0 z-[-100]">
            {models.map((src, index) => (
                <iframe
                    key={index}
                    src={src}
                    loading="eager"
                    aria-hidden="true"
                    className="w-0 h-0 border-0"
                />
            ))}
        </div>
    );
};
