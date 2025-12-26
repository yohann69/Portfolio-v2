import { useEffect, useRef } from 'react';

export function usePointerCssVars(rootRef: React.RefObject<HTMLElement>) {
    const target = useRef({ x: 0, y: 0 });
    const smooth = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            smooth.current.x += (target.current.x - smooth.current.x) * 0.08;
            smooth.current.y += (target.current.y - smooth.current.y) * 0.08;

            const el = rootRef.current;
            if (el) {
                el.style.setProperty('--mx', smooth.current.x.toFixed(4));
                el.style.setProperty('--my', smooth.current.y.toFixed(4));
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [rootRef]);

    const onMouseMove = (e: React.MouseEvent) => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        target.current = { x, y };
    };

    const onMouseLeave = () => {
        target.current = { x: 0, y: 0 };
    };

    return { onMouseMove, onMouseLeave };
}
