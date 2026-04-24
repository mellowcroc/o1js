import { ZkProgram } from 'o1js';
import { Bigint2048, rsaVerify65537 } from './rsa.js';
export const rsaZkProgram = ZkProgram({
    name: 'rsa-verify',
    methods: {
        verifyRsa65537: {
            privateInputs: [Bigint2048, Bigint2048, Bigint2048],
            async method(message, signature, modulus) {
                rsaVerify65537(message, signature, modulus);
            },
        },
    },
});
//# sourceMappingURL=program.js.map