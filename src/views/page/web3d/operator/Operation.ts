import { AnswerContent } from '../types';

export interface Operation {
    apply(answer: AnswerContent): void;
}

export class GroupOperation implements Operation {
    private group: Operation[];

    constructor(group: Operation[]) {
        this.group = group;
    }

    apply(answer: AnswerContent): void {
        this.group.forEach(op => op.apply(answer));
    }
}