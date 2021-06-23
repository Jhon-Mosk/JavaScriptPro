const calculator = require('../calculator/calculator');
const sum = calculator.sum;
const sub = calculator.sub;
const multi = calculator.multi;
const division = calculator.division;

describe('Функция sum()', () => {
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(sum(3, 2)).toBe(5);
    });
    it('должна возвращать "используйте цифры" при аргументах ("3", "2")', () => {
        expect(sum("3", "2")).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (null, null)', () => {
        expect(sum(null, null)).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (undefined, undefined)', () => {
        expect(sum(undefined, undefined)).toBe("используйте цифры");
    });
});

describe('Функция sub()', () => {
    it('должна возвращать 1 при аргументах (3, 2)', () => {
        expect(sub(3, 2)).toBe(1);
    });
    it('должна возвращать "используйте цифры" при аргументах ("3", "2")', () => {
        expect(sub("3", "2")).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (null, null)', () => {
        expect(sub(null, null)).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (undefined, undefined)', () => {
        expect(sub(undefined, undefined)).toBe("используйте цифры");
    });
});

describe('Функция multi()', () => {
    it('должна возвращать 6 при аргументах (3, 2)', () => {
        expect(multi(3, 2)).toBe(6);
    });
    it('должна возвращать "используйте цифры" при аргументах ("3", "2")', () => {
        expect(multi("3", "2")).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (null, null)', () => {
        expect(multi(null, null)).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (undefined, undefined)', () => {
        expect(multi(undefined, undefined)).toBe("используйте цифры");
    });
});

describe('Функция division()', () => {
    it('должна возвращать 1.5 при аргументах (3, 2)', () => {
        expect(division(3, 2)).toBe(1.5);
    });
    it('должна возвращать "используйте цифры" при аргументах ("3", "2")', () => {
        expect(division("3", "2")).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (null, null)', () => {
        expect(division(null, null)).toBe("используйте цифры");
    });
    it('должна возвращать "используйте цифры" при аргументах (undefined, undefined)', () => {
        expect(division(undefined, undefined)).toBe("используйте цифры");
    });
});