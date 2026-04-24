import { Field, SelfProof, ZkProgram } from 'o1js';
export const RecursiveProgram = ZkProgram({
    name: 'recursive-program',
    publicInput: Field,
    methods: {
        baseCase: {
            privateInputs: [],
            async method(input) {
                input.assertEquals(Field(0));
            },
        },
        inductiveCase: {
            privateInputs: [SelfProof],
            async method(input, earlierProof) {
                earlierProof.verify();
                earlierProof.publicInput.add(1).assertEquals(input);
            },
        },
    },
});
//# sourceMappingURL=recursive-program.js.map