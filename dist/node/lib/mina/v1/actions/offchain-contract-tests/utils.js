import * as Mina from '../../mina.js';
export { transfer, settle };
async function transfer(contract, sender, receiver, amount) {
    const tx = Mina.transaction(sender, async () => {
        await contract.transfer(sender, receiver, amount);
    });
    tx.sign([sender.key]);
    await tx.prove().send().wait();
}
async function settle(contract, sender) {
    const proof = await contract.offchainState.createSettlementProof();
    const tx = Mina.transaction(sender, async () => {
        await contract.settle(proof);
    });
    tx.sign([sender.key]);
    await tx.prove().send().wait();
}
//# sourceMappingURL=utils.js.map