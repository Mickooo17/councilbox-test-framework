export class DataGenerator {
    static randomNumber(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    static randomInstitutionName(): string {
        return `Automation Institution ${this.randomNumber(6)}`;
    }

    static randomAddress(): string {
        return `Test Address ${this.randomNumber(4)}`;
    }

    static randomZipCode(): string {
        return this.randomNumber(5);
    }

    static randomCity(): string {
        return `Test City ${this.randomNumber(4)}`;
    }
}
