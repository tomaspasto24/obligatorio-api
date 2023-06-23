export class FormatHelper {
    static readonly string = {
        format: (format: string, ...args: string[]) => {
            let bits = format.split(/(\{\d+\})/g);
            let result: string[] = [];
            for (let bit of bits) {
                if (bit.match(/\{\d+\}/g)) {
                    let index = parseInt(bit.replace(/\{|\}/g, ''));
                    result.push(args[index]);
                }
                else {
                    result.push(`"${bit}"`);
                }
            }
            return result.join(' + ');
        }
    };
}