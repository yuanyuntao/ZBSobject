import CryptoJS from 'crypto-js'


export function getRandom(long) {
	var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
		num = "";
	for (var i = 0; i < long; i++) {
		num += arr[parseInt(Math.random() * 62)];
	}
	return num;
}

/**
* 加密
* @param word
* @returns {*}
*/
export function encrypt(word, key, iv) {
	var key = CryptoJS.enc.Utf8.parse(key);
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
export function decrypt(word, keyStr, iv) {
	let key = CryptoJS.enc.Utf8.parse(keyStr);
	let base64 = CryptoJS.enc.Base64.parse(word);
	let src = CryptoJS.enc.Base64.stringify(base64)
	var decrypt = CryptoJS.AES.decrypt(src, key, { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	// return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	var decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString()

	return decryptedStr.toString();
}

