const fs = require('fs');

const colors = require('colors/safe');

let file = fs
	.readFileSync('main.pzm', { encoding: 'utf8', flag: 'r' })
	.split('\n');

if (!file[0] || file[0] <= 0) {
	console.log('No length for array.');
	process.exit(0);
} else if (file[0] >= 1000) {
	console.log('Array too long.');
	process.exit(0);
}

if (!file[1] || file[1] <= 0) {
	console.log('No width for array.');
	process.exit(0);
} else if (file[1] >= 1000) {
	console.log('Array too wide.');
	process.exit(0);
}

if (!file[2] || file[2] <= 0) {
	console.log('No depth for array.');
	process.exit(0);
} else if (file[1] >= 1000) {
	console.log('Array too deep.');
	process.exit(0);
}

let debug = false;
if (file[3] == 'true') {
	debug = true;
} else if (file[3] == 'false') {
	debug = false;
} else {
	console.log('No debug settings.');
	process.exit(0);
}

let prism = [];
for (d = 0; d < file[2]; d++) {
	let plane = [];
	for (l = 0; l < file[0]; l++) {
		let row = [];
		for (w = 0; w < file[1]; w++) {
			row[w] = 0;
		}
		plane[l] = row;
	}
	prism[d] = plane;
}

let code = file[4].split('');
console.log(code);

let flags = [];
let pointer = 0;
let selector = 0;
let cursor = 0;

for (pos = 0; pos < code.length; pos++) {
	switch (code[pos]) {
		case 'R':
			if (prism[pointer][selector].length > cursor + 1) {
				cursor++;
			} else {
				console.log('Error: No more columns. [R]');
				process.exit(0);
			}
			break;
		case 'L':
			if (0 <= cursor - 1) {
				cursor--;
			} else {
				console.log('Error: No more columns. [L]');
				process.exit(0);
			}
			break;
		case 'U':
			if (0 <= selector - 1) {
				selector++;
			} else {
				console.log('Error: No more rows. [U]');
				process.exit(0);
			}
			break;
		case 'D':
			if (prism[pointer].length > selector + 1) {
				selector++;
			} else {
				console.log('Error: No more rows. [D]');
				process.exit(0);
			}
			break;
		case 'F':
			if (0 <= pointer - 1) {
				pointer--;
			} else {
				console.log('Error: No more planes. [F]');
				process.exit(0);
			}
			break;
		case 'B':
			if (prism.length > pointer + 1) {
				pointer++;
			} else {
				console.log('Error: No more planes. [B]');
				process.exit(0);
			}
			break;
		case '+':
			prism[pointer][selector][cursor]++;
			break;
		case '-':
			prism[pointer][selector][cursor]--;
			break;
		case 'O':
			let str = String.fromCharCode(prism[pointer][selector][cursor]);
			console.log(str);
			break;
		case 'P':
			flags.push(pos);
			break;
		case 'J':
			if (flags[0]) {
				code[pos] = 'N';
				pos = flags[0];
				flags = flags.slice(1, -1);
			}
			break;
		case 'N':
			break;
		default:
			console.log('Error: Unexpected character ' + code[pos] + ' in code!');
			process.exit(0);
	}
}

if (debug == true) {
	console.log(colors.yellow('=>'));
	let planeNum = 0;
	prism.forEach(plane => {
		console.log(colors.white.bold(`Plane ${planeNum + 1}:`));
		let rowNum = 0;
		prism[planeNum].forEach(row => {
			console.log(`Row ${rowNum + 1}: ${prism[planeNum][rowNum]}`);
			rowNum++;
		});
		planeNum++;
	});
}
