import { describe, it, expect } from 'vitest';
import { formatTime } from '../utils/formatTime';

describe('formatTime', () => {
    it('returns minutes when less than 60', () => {
        expect(formatTime(45)).toBe('45');
    })

    it('returns hour + minutes when not divisible by  60', () => {
        expect(formatTime(105)).toBe('1h 45min')
    });

    it('returns hours when higher than 60', () => {
        expect(formatTime(120)).toBe('2')
    });
});
