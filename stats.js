// 최대값
exports.max = numbers => Math.max(...numbers);
// 최소값
exports.min = numbers => Math.min(...numbers);
// 평균
exports.avg = numbers => {
    // const sum = numbers.reduce((acc, current) => acc + current, 0);
    // return sum / numbers.length;
    return numbers.reduce((acc, current, index, {length}) => acc + current / length, 0);
}
// 오름차순 정렬
exports.sort = numbers => numbers.sort((a, b) => a - b);
// 중간값 구하기
exports.median = numbers => {
    const {length} = numbers;
    const middle = Math.floor(length / 2);
    return length % 2 ? numbers[middle] : (numbers[middle -1] + numbers[middle]) / 2;
}
// 최빈값
// 리팩토링 전
exports.mode1 = numbers => {
    // Map object 생성
    const counts = new Map(); 
    // numbers를 돌면서 
    numbers.forEach(n => {
        // counts에 있는 값이면 value를, 없으면 0을 count에 할당
        const count = counts.get(n) || 0;
        // counts에 n(key) value(중복 카운트) 할당
        counts.set(n, count + 1);
    });
    // counts의 value 중 최대값
    const maxCount = Math.max(...counts.values());
    // counts의 key 중 value값이 maxCount와 같은 값만 배열로 선언
    const modes = [...counts.keys()].filter(number => counts.get(number) === maxCount);

    // modes의 길이와 numbers의 길이가 같다면 가장 빈도가 높은 값이 없다는 것. 최빈값이 없는 경우 return null.
    if (modes.length === numbers.length) {
        return null;
    }
    // modes의 길이가 1 이상이면 값이 여러 개이므로 배열 그대로 return.
    if (modes.length > 1) {
        return modes;
    }
    
    // 그 외 경우는 요소가 1개인 배열이므로 요소만 return.
    return modes[0];
};
// 리팩토링 후
exports.mode2 = numbers => {
    const counts = numbers.reduce((acc, current) => acc.set(current, acc.get(current) + 1 || 1), new Map());

    const maxCount = Math.max(...counts.values());
    const modes = [...counts.keys()].filter(number => counts.get(number) === maxCount);

    if (modes.length === numbers.length) {
        return null;
    }

    if (modes.length > 1) {
        return modes;
    };

    return modes[0];
}