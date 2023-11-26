export const getBorderColor = (isCurrent: boolean, isCorrect: boolean) => {
    if (isCurrent) {
        return "border-blue-500";
    } else if (isCorrect === false) {
        return "border-red-500";
    } else if (isCorrect === true) {
        return "border-green-500";
    } else {
        return "border-gray-900";
    }
};

export function isTouchDevice(): boolean {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
}