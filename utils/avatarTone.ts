const avatarTones = ['tone-teal', 'tone-info', 'tone-success', 'tone-warning'] as const;

export const avatarTone = (initial: string) => avatarTones[initial.charCodeAt(0) % avatarTones.length];
