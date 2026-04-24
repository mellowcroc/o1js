import { __decorate, __metadata } from "tslib";
/**
 * Tests that shows we can call a subcontract dynamically based on the address,
 * as long as its signature matches the signature our contract was compiled against.
 *
 * In other words, the exact implementation/constraints of zkApp methods we call are not hard-coded in the caller contract.
 */
import { Bool, UInt64, SmartContract, method, PublicKey, Mina } from '../../../../index.js';
// two implementations with same signature of the called method, but different provable logic
class SubcontractA extends SmartContract {
    async submethod(a, b) {
        return a.greaterThan(b);
    }
}
__decorate([
    method.returns(Bool),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UInt64, UInt64]),
    __metadata("design:returntype", Promise)
], SubcontractA.prototype, "submethod", null);
class SubcontractB extends SmartContract {
    async submethod(a, b) {
        return a.mul(b).equals(UInt64.from(42));
    }
}
__decorate([
    method.returns(Bool),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UInt64, UInt64]),
    __metadata("design:returntype", Promise)
], SubcontractB.prototype, "submethod", null);
// caller contract that calls the subcontract
class Caller extends SmartContract {
    async call(a, b, address) {
        const subcontract = new Caller.Subcontract(address);
        await subcontract.submethod(a, b);
    }
}
// subcontract to call. this property is changed below
// TODO: having to set this property is a hack, it would be nice to pass the contract as parameter
Caller.Subcontract = SubcontractA;
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UInt64, UInt64, PublicKey]),
    __metadata("design:returntype", Promise)
], Caller.prototype, "call", null);
// TEST BELOW
// setup
let Local = await Mina.LocalBlockchain({ proofsEnabled: true });
Mina.setActiveInstance(Local);
let [sender, callerAccount, aAccount, bAccount] = Local.testAccounts;
await SubcontractA.compile();
await SubcontractB.compile();
await Caller.compile();
let caller = new Caller(callerAccount);
let a = new SubcontractA(aAccount);
let b = new SubcontractB(bAccount);
await Mina.transaction(sender, async () => {
    await caller.deploy();
    await a.deploy();
    await b.deploy();
})
    .sign([callerAccount.key, aAccount.key, bAccount.key, sender.key])
    .send();
// subcontract A call
let x = UInt64.from(10);
let y = UInt64.from(5);
await Mina.transaction(sender, () => caller.call(x, y, aAccount))
    .prove()
    .sign([sender.key])
    .send();
// subcontract B call
Caller.Subcontract = SubcontractB;
await Mina.transaction(sender, () => caller.call(x, y, bAccount))
    .prove()
    .sign([sender.key])
    .send();
//# sourceMappingURL=dynamic-call.unit-test.js.map