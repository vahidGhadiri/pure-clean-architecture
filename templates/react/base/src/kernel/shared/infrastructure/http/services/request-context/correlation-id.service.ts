import { v4 as uuidv4 } from 'uuid';

export interface ICorrelationIdGenerator {
    generate(): string;
}

export class UuidCorrelationIdGenerator implements ICorrelationIdGenerator {
    public generate(): string {
        return uuidv4();
    }
}
