export interface IQuestions {
    type: typeQuestions.type;
    title: string;
    desc?: string;
    in_class: string;
    do_type: typeQuestions.doType;
    do_time: number;
    time_start_for_live?: number;
    questions: {
        q: string;
        img?: string;
        answers: {
            answer: string;
            correct?: boolean;
        }[];
    }[];
}

// tslint:disable-next-line: no-namespace
export namespace typeQuestions {
    export type type = 'basic' | 'iframe';
    export const type = {
        basic: 'basic' as type,
        iframe: 'iframe' as type
    };

    export type doType = 'live' | 'exercise';
    export const doType = {
        live: 'live' as doType,
        timer: 'exercise' as doType
    };
}
