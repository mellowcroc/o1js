import { __decorate, __metadata } from "tslib";
import { SmartContract, method, state, PublicKey, UInt64, Experimental, } from '../../../../../index.js';
export { offchainState, StateProof, ExampleContract };
const { OffchainState } = Experimental;
const offchainState = OffchainState({
    accounts: OffchainState.Map(PublicKey, UInt64),
    totalSupply: OffchainState.Field(UInt64),
}, { logTotalCapacity: 10, maxActionsPerProof: 5 });
class StateProof extends offchainState.Proof {
}
// example contract that interacts with offchain state
class ExampleContract extends SmartContract {
    constructor() {
        super(...arguments);
        this.offchainStateCommitments = offchainState.emptyCommitments();
        // o1js memoizes the offchain state by contract address so that this pattern works
        this.offchainState = offchainState.init(this);
    }
    async createAccount(address, amountToMint) {
        // setting `from` to `undefined` means that the account must not exist yet
        this.offchainState.fields.accounts.update(address, {
            from: undefined,
            to: amountToMint,
        });
        // TODO using `update()` on the total supply means that this method
        // can only be called once every settling cycle
        let totalSupplyOption = await this.offchainState.fields.totalSupply.get();
        let totalSupply = totalSupplyOption.orElse(0n);
        this.offchainState.fields.totalSupply.update({
            from: totalSupplyOption,
            to: totalSupply.add(amountToMint),
        });
    }
    async transfer(from, to, amount) {
        let fromOption = await this.offchainState.fields.accounts.get(from);
        let fromBalance = fromOption.assertSome('sender account exists');
        let toOption = await this.offchainState.fields.accounts.get(to);
        let toBalance = toOption.orElse(0n);
        /**
         * Update both accounts atomically.
         *
         * This is safe, because both updates will only be accepted if both previous balances are still correct.
         */
        this.offchainState.fields.accounts.update(from, {
            from: fromOption,
            to: fromBalance.sub(amount),
        });
        this.offchainState.fields.accounts.update(to, {
            from: toOption,
            to: toBalance.add(amount),
        });
    }
    async getSupply() {
        return (await this.offchainState.fields.totalSupply.get()).orElse(0n);
    }
    async getBalance(address) {
        return (await this.offchainState.fields.accounts.get(address)).orElse(0n);
    }
    async settle(proof) {
        await this.offchainState.settle(proof);
    }
}
__decorate([
    state(OffchainState.Commitments),
    __metadata("design:type", Object)
], ExampleContract.prototype, "offchainStateCommitments", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, UInt64]),
    __metadata("design:returntype", Promise)
], ExampleContract.prototype, "createAccount", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, PublicKey, UInt64]),
    __metadata("design:returntype", Promise)
], ExampleContract.prototype, "transfer", null);
__decorate([
    method.returns(UInt64),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleContract.prototype, "getSupply", null);
__decorate([
    method.returns(UInt64),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey]),
    __metadata("design:returntype", Promise)
], ExampleContract.prototype, "getBalance", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StateProof]),
    __metadata("design:returntype", Promise)
], ExampleContract.prototype, "settle", null);
//# sourceMappingURL=ExampleContract.js.map