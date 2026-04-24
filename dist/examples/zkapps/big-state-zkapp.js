var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Example zkApp demonstrating maximum on-chain state usage (32 field elements)
 * using composite data structures with Struct.
 */
import { AccountUpdate, Field, Mina, Provable, SmartContract, State, Struct, method, state, } from 'o1js';
// composite structure representing a 2D point (2 field elements)
class Point extends Struct({
    x: Field,
    y: Field,
}) {
    static zero() {
        return new Point({ x: Field(0), y: Field(0) });
    }
    add(other) {
        return new Point({
            x: this.x.add(other.x),
            y: this.y.add(other.y),
        });
    }
}
// larger composite structure representing game state (8 field elements)
class GameState extends Struct({
    score: Field,
    level: Field,
    health: Field,
    mana: Field,
    position: Point, // 2 fields
    velocity: Point, // 2 fields
}) {
    static initial() {
        return new GameState({
            score: Field(0),
            level: Field(1),
            health: Field(100),
            mana: Field(50),
            position: Point.zero(),
            velocity: Point.zero(),
        });
    }
}
// struct for storing multiple field elements
class DataBlock extends Struct({
    values: Provable.Array(Field, 8),
}) {
    static empty() {
        return new DataBlock({ values: Array(8).fill(Field(0)) });
    }
    static fromSeed(seed) {
        const values = [];
        let current = seed;
        for (let i = 0; i < 8; i++) {
            values.push(current);
            current = current.add(Field(1));
        }
        return new DataBlock({ values });
    }
}
class BigStateZkapp extends SmartContract {
    constructor() {
        super(...arguments);
        this.gameState = State();
        this.dataBlock1 = State();
        this.dataBlock2 = State();
        this.dataBlock3 = State();
    }
    async initializeState() {
        this.gameState.set(GameState.initial());
        this.dataBlock1.set(DataBlock.empty());
        this.dataBlock2.set(DataBlock.empty());
        this.dataBlock3.set(DataBlock.empty());
    }
    async updateGameState(newPosition, newVelocity) {
        const current = this.gameState.getAndRequireEquals();
        const updated = new GameState({
            score: current.score.add(Field(10)),
            level: current.level,
            health: current.health,
            mana: current.mana,
            position: current.position.add(newPosition),
            velocity: newVelocity,
        });
        this.gameState.set(updated);
    }
    async setDataBlocks(seed1, seed2, seed3) {
        this.dataBlock1.set(DataBlock.fromSeed(seed1));
        this.dataBlock2.set(DataBlock.fromSeed(seed2));
        this.dataBlock3.set(DataBlock.fromSeed(seed3));
    }
    async levelUp() {
        const current = this.gameState.getAndRequireEquals();
        const updated = new GameState({
            score: current.score,
            level: current.level.add(Field(1)),
            health: Field(100),
            mana: Field(50),
            position: current.position,
            velocity: current.velocity,
        });
        this.gameState.set(updated);
    }
}
__decorate([
    state(GameState),
    __metadata("design:type", Object)
], BigStateZkapp.prototype, "gameState", void 0);
__decorate([
    state(DataBlock),
    __metadata("design:type", Object)
], BigStateZkapp.prototype, "dataBlock1", void 0);
__decorate([
    state(DataBlock),
    __metadata("design:type", Object)
], BigStateZkapp.prototype, "dataBlock2", void 0);
__decorate([
    state(DataBlock),
    __metadata("design:type", Object)
], BigStateZkapp.prototype, "dataBlock3", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BigStateZkapp.prototype, "initializeState", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Point, Point]),
    __metadata("design:returntype", Promise)
], BigStateZkapp.prototype, "updateGameState", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field, Field, Field]),
    __metadata("design:returntype", Promise)
], BigStateZkapp.prototype, "setDataBlocks", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BigStateZkapp.prototype, "levelUp", null);
const doProofs = true;
console.log('BigStateZkapp Example - using 32 on-chain state fields\n');
let Local = await Mina.LocalBlockchain({ proofsEnabled: doProofs });
Mina.setActiveInstance(Local);
const [sender] = Local.testAccounts;
const zkappAccount = Mina.TestPublicKey.random();
const zkapp = new BigStateZkapp(zkappAccount);
if (doProofs) {
    console.log('Compiling...');
    console.time('compile');
    await BigStateZkapp.compile();
    console.timeEnd('compile');
}
console.log('\nDeploying zkApp...');
let tx = await Mina.transaction(sender, async () => {
    AccountUpdate.fundNewAccount(sender);
    await zkapp.deploy();
});
await tx.prove();
await tx.sign([sender.key, zkappAccount.key]).send();
console.log('Initializing state...');
tx = await Mina.transaction(sender, async () => {
    await zkapp.initializeState();
});
await tx.prove();
await tx.sign([sender.key]).send();
// read initial state
let gameState = zkapp.gameState.get();
console.log('\nInitial game state:');
console.log(`  Score: ${gameState.score}`);
console.log(`  Level: ${gameState.level}`);
console.log(`  Health: ${gameState.health}`);
console.log(`  Position: (${gameState.position.x}, ${gameState.position.y})`);
console.log('\nUpdating game state...');
tx = await Mina.transaction(sender, async () => {
    await zkapp.updateGameState(new Point({ x: Field(10), y: Field(20) }), new Point({ x: Field(1), y: Field(2) }));
});
await tx.prove();
await tx.sign([sender.key]).send();
gameState = zkapp.gameState.get();
console.log('Updated game state:');
console.log(`  Score: ${gameState.score}`);
console.log(`  Position: (${gameState.position.x}, ${gameState.position.y})`);
console.log(`  Velocity: (${gameState.velocity.x}, ${gameState.velocity.y})`);
console.log('\nSetting data blocks with seeds...');
tx = await Mina.transaction(sender, async () => {
    await zkapp.setDataBlocks(Field(100), Field(200), Field(300));
});
await tx.prove();
await tx.sign([sender.key]).send();
const dataBlock1 = zkapp.dataBlock1.get();
console.log(`DataBlock1 values: [${dataBlock1.values.join(', ')}]`);
console.log('\nLeveling up...');
tx = await Mina.transaction(sender, async () => {
    await zkapp.levelUp();
});
await tx.prove();
await tx.sign([sender.key]).send();
gameState = zkapp.gameState.get();
console.log('After level up:');
console.log(`  Level: ${gameState.level}`);
console.log(`  Health: ${gameState.health} (restored)`);
console.log(`  Mana: ${gameState.mana} (restored)`);
// verify all 32 state fields are used
const account = Mina.getAccount(zkappAccount);
console.log('\nOn-chain state (all 32 fields):');
account.zkapp.appState.forEach((field, i) => {
    console.log(`  appState[${i}]: ${field}`);
});
console.log('\nBigStateZkapp example completed successfully!');
//# sourceMappingURL=big-state-zkapp.js.map