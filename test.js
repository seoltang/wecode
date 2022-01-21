const getEven = () => {
    let arr = [];
    for (let i = 2; i <= 50; i += 2) {
        arr.push(i);
    }
    return arr;
};
getEven();