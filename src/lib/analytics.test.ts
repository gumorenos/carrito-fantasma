import { describe, expect, it } from 'vitest'
import { getValueBand } from './analytics'

describe('analytics value bands', () => {
  it.each([
    [0, 'under-50'],
    [4999, 'under-50'],
    [5000, '50-99'],
    [9999, '50-99'],
    [10000, '100-199'],
    [19999, '100-199'],
    [20000, '200-399'],
    [39999, '200-399'],
    [40000, '400-plus'],
  ])('maps %s cents to %s', (amount, expected) => {
    expect(getValueBand(amount)).toBe(expected)
  })
})
