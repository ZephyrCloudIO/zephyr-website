// Shared motion vocabulary. Markers move like physical objects (springs);
// scenes and the camera ease; nothing bounces for decoration.

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Release markers gliding between versions. */
export const SPRING_MARKER = { type: 'spring', stiffness: 340, damping: 34, mass: 0.9 } as const;

/** Cards landing on the deployed rail. */
export const SPRING_CARD = { type: 'spring', stiffness: 260, damping: 30 } as const;

export const FADE = { duration: 0.32, ease: EASE_OUT } as const;

/** Stage-level scene changes (panels swapping, camera moves). */
export const SCENE = { duration: 0.7, ease: EASE_IN_OUT } as const;
