var chords = new Object();
var chordsIndexes = [['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'], ['M','m','aug']];
var notes, strings;

function chordsInit() {
	notes = ["E0", "F0", "Fd0", "G0", "Gd0", "A0", "Ad0", "B0",
                 "C1", "Cd1", "D1", "Dd1", "E1", "F1", "Fd1", "G1", "Gd1", "A1", "Ad1", "B1",
                 "C2", "Cd2", "D2", "Dd2", "E2", "F2", "Fd2", "G2", "Gd2", "A2", "Ad2", "B2",
                 "C3", "Cd3", "D3", "Dd3", "E3", "F3", "Fd3", "G3", "Gd3", "A3", "Ad3", "B3",
                 "C4", "Cd4", "D4", "Dd4", "E4"];

    strings = ["E0","A0","D1","G1","B1","E2"];

	chords.CM = [[null, 3, 2, 0, 1, 0], [null, 3, 2, 0, 1, 3], [null, 3, 2, 0, null, null], [null, null, null, 5, 5, 3], [null, 3, 5, 5, 5, 3], [null, 3, 5, 5, 5, null], [null, null, 10, 9, 8, 8], [null, null, 10, 9, 8, null], [8, 10, 10, 9, 8, 8], [8, 10, 10, 9, null, null]];
	chords.Cm = [[null, 3, 1, 0, null, null]];
	chords.Caug = [[null, 3, 2, 1, null, null]];

	chords.CdM = [[null, 4, 6, 6, 6, 4], [null, 4, 6, 6, 6, null], [null, null, null, 6, 6, 4]];
	chords.Cdm = [[null, 4, 6, 6, 5, 4], [null, 4, 6, 6, 5, null], [null, null, null, 6, 5, 4], [9, 11, 11, 9, 9, 9], [null, null, 11, 9, 9, null], [null, null, 11, 9, 9, 9]];
	chords.Cdaug = [[null, 3, 2, 1, 1, null]];

	chords.DM = [[null, null, 0, 2, 3, 2]];
	chords.Dm = [[null, null, 0, 2, 3, 1]];
	chords.Daug = [[null, null, 0, 3, 3, 2]];

	chords.DdM = [[null, 6, 8, 8, 8, 6]];
	chords.Ddm = [[null, 6, 8, 8, 7, 6]];
	chords.Ddaug = [[null, null, 1, 0, 0, null]];

	chords.EM = [[0, 2, 2, 1, 0, 0]];
	chords.Em = [[0, 2, 2, 0, 0, 0]];

	chords.FM = [[1, 3, 3, 2, 1, 1]];
	chords.Fm = [[1, 3, 3, 1, 1, 1]];

	chords.FdM = [[2, 4, 4, 3, 2, 2]];
	chords.Fdm = [[2, 4, 4, 2, 2, 2]];

	chords.GM = [[3, 2, 0, 0, 0, 3], [3, 5, 5, 4, 3, 3], [3, 5, 5, 4, null, null], [null, null, 5, 4, 3, null]];
	chords.Gm = [[3, 5, 5, 3, 3, 3]];

	chords.GdM = [[4, 6, 6, 5, 4, 4]];
	chords.Gdm = [[4, 6, 6, 4, 4, 4]];

	chords.AM = [[null, 0, 2, 2, 2, 0]];
	chords.Am = [[null, 0, 2, 2, 1, 0]];

	chords.AdM = [[null, 1, 3, 3, 3, 1]];
	chords.Adm = [[null, 1, 3, 3, 2, 1]];

	chords.BM = [[null, 2, 4, 4, 4, 2]];
	chords.Bm = [[null, 2, 4, 4, 3, 2]];
}