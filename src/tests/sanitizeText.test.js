import { describe, it, expect } from "vitest";
import { sanitizeText } from "../services/recipeService";

describe('sanitizeText', () => {
    it('escapes script tags', () => {
        const input = '<script></script>';
        const result = sanitizeText(input);

        expect(result).not.toContain('<script>')
        expect(result).toContain('&lt;script&gt;')
    })
    it('returns normal text without changes', () => {
        const input = 'Hello world';
        const result = sanitizeText(input);

        expect(result).toBe('Hello world')
    })
})