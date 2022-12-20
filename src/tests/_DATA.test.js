import {
    _saveQuestion,
    _saveQuestionAnswer
} from '../utils/_DATA';

describe('_saveQuestion', () => {
    it('will return the formated question is successful', async () => {
        const question = {
            author: 'tylermcginnis',
            optionOneText: 'Testing 1',
            optionTwoText: 'Testing 2',
        };
        const result = await _saveQuestion(question);

        expect(result.author).toBe(question.author);
        expect(result.id).not.toBeNull();
        expect(result.timestamp).not.toBeNull();
        expect(result.optionOne.text).toEqual(question.optionOneText);
        expect(result.optionTwo.text).toEqual(question.optionTwoText);
    });

    it('will errors show if the wrong info is passed', async () => {
        const question = {
            author: 'tylermcginnis',
            optionTwoText: 'Testing with Out OptionOneText',
        };
        await expect(_saveQuestion(question)).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });
});

describe('_saveQuestionAnswer', () => {
    it('will be true if successful', async () => {
        const authedUser = 'tylermcginnis';
        const qid = '8xf0y6ziyjabvozdd253nd';
        const answer = 'optionOne';
        const update = { authedUser, qid, answer };

        await expect(_saveQuestionAnswer(update)).resolves.toBe(true);
    });

    it('will return an error if unsuccessful', async () => {
        const object = {
            answer: 'optionOne',
            qid: '8xf0y6ziyjabvozdd253nd',
            type: 'ANSWER_QUESTION',
        };
        await expect(_saveQuestionAnswer(object)).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });
});
