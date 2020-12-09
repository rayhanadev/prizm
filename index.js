const fs = require('fs');
const colors = require('colors/safe');

let file = fs
	.readFileSync('main.pzm', { encoding: 'utf8', flag: 'r' })
	.split('\n');

function errorLog(type, message) {
	console.log(colors.red(`${type} Error: ${message}.`));
	process.exit(0);
}

if (!file[0] || file[0] <= 0) {
	errorLog('Creation', 'No length for array.');
} else if (file[0] >= 1000) {
	errorLog('Creation', 'Array too long.');
}

if (!file[1] || file[1] <= 0) {
	errorLog('Creation', 'No width for array.');
} else if (file[1] >= 1000) {
	errorLog('Creation', 'Array too wide.');
}

if (!file[2] || file[2] <= 0) {
	errorLog('Creation', 'No depth for array.');
} else if (file[1] >= 1000) {
	errorLog('Creation', 'Array too deep.');
}

let debug = false;
if (file[3].toLowerCase() == 'true') {
	debug = true;
} else if (file[3].toLowerCase() == 'false') {
	debug = false;
} else {
	errorLog('Creation', 'No debug settings.');
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

let code = [];
for (i = 4; i < file.length; i++) {
	code = code.concat(file[i].split(''));
}

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
				errorLog('Movement', 'No more columns. [R]');
			}
			break;
		case 'L':
			if (0 <= cursor - 1) {
				cursor--;
			} else {
				errorLog('Movement', 'No more columns. [L]');
			}
			break;
		case 'U':
			if (0 <= selector - 1) {
				selector--;
			} else {
				errorLog('Movement', 'No more rows. [U]');
			}
			break;
		case 'D':
			if (prism[pointer].length > selector + 1) {
				selector++;
			} else {
				errorLog('Movement', 'No more rows. [D]');
			}
			break;
		case 'B':
			if (0 <= pointer - 1) {
				pointer--;
			} else {
				errorLog('Movement', 'No more planes. [B]');
			}
			break;
		case 'F':
			if (prism.length > pointer + 1) {
				pointer++;
			} else {
				errorLog('Movement', 'No more planes. [F]');
				process.exit(0);
			}
			break;
		case '+':
			prism[pointer][selector][cursor]++;
			break;
		case '-':
			if (prism[pointer][selector][cursor] != 0) {
				prism[pointer][selector][cursor]--;
			} else {
				errorLog('Value', 'Attempted to decrement cell below 0.');
			}
			break;
		case 'O':
			let str = String.fromCharCode(prism[pointer][selector][cursor]);
			console.log(str);
			break;
		case 'P':
			if (!flags.includes([pos, pointer, selector, cursor])) {
				flags.push([pos, pointer, selector, cursor]);
			}
			break;
		case 'J':
			if (flags[0] && prism[flags[0][1]][flags[0][2]][flags[0][3]] != 0) {
				pos = flags[0][0];
			} else if (
				flags[0] &&
				prism[flags[0][1]][flags[0][2]][flags[0][3]] == 0
			) {
				code[pos] = 'N';
				flags = flags.slice(1, -1);
			} else if (!flags[0]) {
				errorLog('Jump', 'No Jump Point.');
			}
			break;
		case 'N':
			break;
		default:
			errorLog('Type', 'Unexpected character ' + code[pos] + ' in code!');
	}
}

if (debug == true) {
	console.log(colors.yellow('\n=>'));
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
