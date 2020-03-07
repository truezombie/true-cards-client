import { sum, concat } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('concat Oleh Ovcharenko', () => {
  expect(concat('Oleh', ' Ovcharenko')).toBe('Oleh Ovcharenko');
});
