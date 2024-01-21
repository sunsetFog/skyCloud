// @ts-nocheck
export const changeWay = (value: any = {}) => {
    let checkArr = document.getElementsByClassName('checkApt');
    if (checkArr.length == 0) {
        return;
    }

    if (value?.target?.getAttribute('keys') == 'checkAll') {
        if (checkArr[0].checked) {
            for (let i = 0; i < checkArr.length; i++) {
                let row = checkArr[i];
                row.checked = true;
            }
        } else {
            for (let i = 0; i < checkArr.length; i++) {
                let row = checkArr[i];
                row.checked = false;
            }
        }
        return;
    }

    let count = 0;
    for (let i = 0; i < checkArr.length; i++) {
        let row = checkArr[i];
        let keys = row.getAttribute('keys');
        let checked = row.checked;
        if (keys != 'checkAll' && checked) {
            count = count + 1;
        }
    }
    if (count == 0) {
        checkArr[0].checked = false;
        return;
    }
    if (count == checkArr.length - 1) {
        checkArr[0].checked = true;
    } else {
        checkArr[0].checked = false;
    }
};
