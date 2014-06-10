var chords = new Object();
var chordsIndexes = [['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'], ['M','m']];
var notes, strings;

function chordsInit() {
	notes = ["E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
                 "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
                 "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
                 "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
                 "C4", "C#4", "D4", "D#4", "E4"];

    strings = ["E0","A0","D1","G1","B1","E2"];

    chords = {
		"CM": [[null, 3, 2, 0, 1, 0], [null, 3, 2, 0, 1, 3], [null, 3, 2, 0, null, null], [null, null, null, 5, 5, 3], [null, 3, 5, 5, 5, 3], [null, 3, 5, 5, 5, null], [null, null, 10, 9, 8, 8], [null, null, 10, 9, 8, null], [8, 10, 10, 9, 8, 8], [8, 10, 10, 9, null, null]],
		"Cm": [[null, 3, 1, 0, null, null]],
		//"Caug": [[null, 3, 2, 1, null, null]],

		"C#M": [[null, 4, 6, 6, 6, 4], [null, 4, 6, 6, 6, null], [null, null, null, 6, 6, 4]],
		"C#m": [[null, 4, 6, 6, 5, 4], [null, 4, 6, 6, 5, null], [null, null, null, 6, 5, 4], [9, 11, 11, 9, 9, 9], [null, null, 11, 9, 9, null], [null, null, 11, 9, 9, 9]],
		//"Cdaug": [[null, 3, 2, 1, 1, null]],

		"DM": [[null, null, 0, 2, 3, 2]],
		"Dm": [[null, null, 0, 2, 3, 1]],
		//"Daug": [[null, null, 0, 3, 3, 2]],

		"D#M": [[null, 6, 8, 8, 8, 6]],
		"D#m": [[null, 6, 8, 8, 7, 6]],
		//"Ddaug": [[null, null, 1, 0, 0, null]],

		"EM": [[0, 2, 2, 1, 0, 0]],
		"Em": [[0, 2, 2, 0, 0, 0]],

		"FM": [[1, 3, 3, 2, 1, 1]],
		"Fm": [[1, 3, 3, 1, 1, 1]],

		"F#M": [[2, 4, 4, 3, 2, 2]],
		"F#m": [[2, 4, 4, 2, 2, 2]],

		"GM": [[3, 2, 0, 0, 0, 3], [3, 5, 5, 4, 3, 3], [3, 5, 5, 4, null, null], [null, null, 5, 4, 3, null]],
		"Gm": [[3, 5, 5, 3, 3, 3]],

		"G#M": [[4, 6, 6, 5, 4, 4]],
		"G#m": [[4, 6, 6, 4, 4, 4]],

		"AM": [[null, 0, 2, 2, 2, 0]],
		"Am": [[null, 0, 2, 2, 1, 0]],

		"A#M": [[null, 1, 3, 3, 3, 1]],
		"A#m": [[null, 1, 3, 3, 2, 1]],

		"BM": [[null, 2, 4, 4, 4, 2]],
		"Bm": [[null, 2, 4, 4, 3, 2]]
    };
}