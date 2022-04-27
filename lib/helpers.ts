import queryString from 'query-string';
import CryptoJS from 'crypto-js';

export const nicknameMaker = () => {
  let firstNameList = ['A', 'B', 'C', 'D', 'E', 'F'];
  let secondNameList = ['1', '2', '3', '4', '6', '7'];
  let first = Math.floor(Math.random() * firstNameList.length - 1) + 1;
  let second = Math.floor(Math.random() * firstNameList.length - 1) + 1;
  return firstNameList[first] + '_' + secondNameList[second];
};
/**
 * 텍스트 복호화
 * @param ciphertext
 * @returns 복호화 된 text
 */
export const decryptWithAES = (ciphertext: string) => {
  try {
    const passphrase = 'yna';
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);

    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
};

export const encryptPassword = async (password: string) => {
  const { createHash } = await import('crypto');
  try {
    return createHash('sha256').update(password).digest('hex');
  } catch (error) {
    console.log('encrypt error ');
    return null;
  }
};
