const h_num = {
    0: 'ゼロ',
    1: 'いち',
    2: 'に',
    3: 'さん',
    4: 'よん',
    5: 'ご',
    6: 'ろく',
    7: 'なな',
    8: 'はち',
    9: 'きゅう'
}

const h_num_plus = {
    10: 'じゅう', 100: 'ひゃく', 1000: 'せん', 10000: 'まん'
}

const h_num_spc = {
    300: 'さんびゃく', 600: 'ろっぴゃく', 800: 'はっぴゃく', 3000: 'さんぜん', 8000: 'はっせん'
}

const k_num = {
    'いち': '一', 'に': 'ニ', 'さん': '三', 'よん': '四', 'ご': '五', 'ろく': '六', 'なな': '七', 'はち': '八', 'きゅう': '九', 'じゅう': '十', 'ひゃく': '百', 'せん': '千', 'まん': '万', 'さんびゃく': '三百', 'ろっぴゃく': '六百', 'はっぴゃく': '八百', 'さんぜん': '三千', 'はっせん': '八千'
}


// LOGIC
export class Conversion {
    constructor(nums) {
        this.nums = nums;
    }

    One = () => {
        let one_out = '';
        for (const [key, value] of Object.entries(h_num)) {
            if (this.nums == key) {
                one_out = value
            }
        }
        return(one_out);
    }

    Two = (cut2=0) => {
        let two_out = '';
        let temp2 = [];
        
        if (cut2 > 0) {
            this.nums = cut2;
        } else if (cut2 == 0 && cut2.length > 1) {
            this.nums = '00';
        }

        if (this.nums[0] == 1) {
            two_out = h_num_plus[10];
            temp2.push(h_num_plus[10]);
        }

        for (const [key, value] of Object.entries(h_num)) {
            if (this.nums[0] == key && key > 1) {
                two_out = value + h_num_plus[10];
                temp2.push(value);
                temp2.push(h_num_plus[10]);
            }
        }

        for (const [key, value] of Object.entries(h_num)) {
            if (this.nums[1] == key && key > 0) {
                two_out += value;
                temp2.push(value);
            }
        }
        return {two_out, temp2};
    }

    Three = (cut3=0) => {
        let three_out = '';
        let temp3 = [];
        if (cut3 > 0) {
            this.nums = cut3;
        } else if (cut3 == 0 && cut3.length > 1) {
            this.nums = '000';
        }
        const specials = [3,6,8];
        for (let spc of specials) {
            if (this.nums[0] == spc) {
                spc = spc * 100;
                three_out = h_num_spc[spc];
                temp3.push(h_num_spc[spc]);
            }
        }
        if (this.nums[0] == 1) {
            three_out = h_num_plus[100];
            temp3.push(h_num_plus[100]);
        }
        for (const [key, value] of Object.entries(h_num)) {
            if (this.nums[0] == key && key > 1 && key != 3 && key != 6 && key != 8) {
                three_out = value + h_num_plus[100];
                temp3.push(value);
                temp3.push(h_num_plus[100]);
            }
        }
        cut3 = this.nums.toString().slice(-2);
        
        let { two_out, temp2 } = this.Two(cut3);
        three_out += two_out;
        console.log(temp3);
        temp3.push(...temp2);
        return {three_out, temp3};
    }

    Four = (cut4=0) => {
        let four_out = '';
        let temp4 = [];
        let special = [3, 8];
        if (cut4 > 0) {
            this.nums = cut4;
        } else if (cut4 == 0 && cut4.length > 1) {
            this.nums = '0000';
        }
        console.log(`FOUR: ${cut4}`);
        if (this.nums[0] != 0) {
            for (let i of special) {
                if (this.nums[0] == i) {
                    i = i * 1000;
                    four_out = h_num_spc[i];
                    temp4.push(h_num_spc[i]);
                }
            }
            if (this.nums[0] == 1) {
                four_out = h_num_plus[1000];
                temp4.push(h_num_plus[1000]);
            }
            for (const [key, value] of Object.entries(h_num)) {
                if (this.nums[0] == key && key != 3 && key != 8 && key != 1) {
                    four_out = value + h_num_plus[1000];
                    temp4.push(value);
                    temp4.push(h_num_plus[1000]);
                }
            }
            cut4 = this.nums.toString().slice(-3);
            let { three_out, temp3 } = this.Three(cut4);
            four_out += three_out;
            temp4.push(...temp3);
        } else {
            this.nums = this.nums.toString().slice(-2);
            cut4 = this.nums;
            let { three_out, temp3 } = this.Three(cut4);
            four_out += three_out;
            temp4.push(...temp3);
        }
        
        return {four_out, temp4};
    }

    Five = (cut5=0) => {
        let five_out = '';
        let temp5 = [];
        if (cut5 > 0) {
            this.nums = cut5;
        } else if (cut5 == 0 && cut5.length > 1) {
            this.nums = '00000';
        }
        for (const [key, value] of Object.entries(h_num)) {
            if (this.nums[0] == key) {
                five_out = value + h_num_plus[10000];
                temp5.push(value);
                temp5.push(h_num_plus[10000]);
            }
        }
        cut5 = this.nums.toString().slice(-4);
        let {four_out, temp4} = this.Four(cut5);
        five_out += four_out;
        temp5.push(...temp4);
        return{five_out, temp5};
    }

    Six = (cut7=0) => {
        let six_out = '';
        let temp6 = [];
        let cut65 = this.nums.toString().slice(0,2);
        let cut6 = this.nums.toString().slice(-4);
        console.log(`Cut6: ${cut6} Cut65: ${cut65}`);
        if (cut7 > 0) {
            this.nums = cut7;
            cut65 = this.nums.toString().slice(0,2);
            cut6 = this.nums.toString().slice(-4);
        } else if (cut7 == 0 && cut7.length > 1) {
            this.nums = '000000';
        }
        let {two_out, temp2} = this.Two(cut65);
        six_out = two_out + h_num_plus[10000];
        temp6.push(...temp2);
        temp6.push(h_num_plus[10000]);

        let {four_out, temp4} = this.Four(cut6);
        
        six_out += four_out;
        temp6.push(...temp4);
        return{six_out, temp6};
    }

    Convert = () => {
        let kanji = '';
        let hir_out = '';
        if (this.nums.length == 1) {
            hir_out = this.One();
            kanji = k_num[hir_out];
        } else if (this.nums.length == 2) {
            const {two_out, temp2} = this.Two();
            hir_out = two_out;
            for (const i of temp2) {
                kanji += k_num[i];
            }
        } else if (this.nums.length == 3) {
            let {three_out, temp3} = this.Three();
            hir_out = three_out;
            for (const i of temp3) {
                kanji += k_num[i];
            }
        } else if (this.nums.length == 4) {
            let {four_out, temp4} = this.Four();
            hir_out = four_out;
            for (const i of temp4) {
                kanji += k_num[i];
            }
        } else if (this.nums.length == 5) {
            let {five_out, temp5} = this.Five();
            hir_out = five_out;
            for (const i of temp5) {
                kanji += k_num[i];
            }
        } else if (this.nums.length == 6) {
            let {six_out, temp6} = this.Six();
            hir_out = six_out;
            for (const i of temp6) {
                kanji += k_num[i];
            }
        } else {
            hir_out = 'You entered too many numbers! Or you forgot to put any!';
        }

        return {hir_out, kanji};
    }
}