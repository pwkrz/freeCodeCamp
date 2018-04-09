const BEEPS = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];
const FIXFORMAT = (num: number): string => num < 10 ? `0${num}` : num.toString();

interface UserMove {
    (e: MouseEvent | TouchEvent, i: number): void;
};

export {BEEPS, FIXFORMAT, UserMove};