export default class Id {
    static current = 1;

    static increase() {
        this.current += 1;
        return `zTree${this.current}`;
    }
}
