import { InstitutionData } from '../pages/institutions/InstitutionsPage';
import { TemplateData } from '../pages/templates/TemplatesPage';
import { TagData } from '../pages/templates/TagsPage';

export class DataGenerator {
    static randomNumber(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    static randomString(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
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

    static randomInstitutionData(): InstitutionData {
        return {
            name: this.randomInstitutionName(),
            cif: this.randomNumber(8),
            address: this.randomAddress(),
            zipCode: this.randomZipCode(),
            city: this.randomCity(),
        };
    }

    static randomTemplateName(): string {
        return `Automation Template ${this.randomNumber(6)}`;
    }

    static randomTemplateType(): string {
        const types = [
            'Consents',
            'Description of the procedure',
            'Conclusion',
            'Warning',
            'Notification',
            'Post-appointment instructions',
        ];
        return types[Math.floor(Math.random() * types.length)]!;
    }

    static randomTemplateData(): TemplateData {
        return {
            name: this.randomTemplateName(),
            content: `Automation Content ${this.randomString(60)}`,
            type: this.randomTemplateType(),
        };
    }

    static randomTagKey(): string {
        return `AUTO_TAG_${this.randomString(6).toUpperCase()}`;
    }

    static randomTagData(): TagData {
        return {
            key: this.randomTagKey(),
            value: `auto_value_${this.randomString(6)}`,
            description: `Automation tag description ${this.randomString(10)}`,
        };
    }
}
