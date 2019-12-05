'use strict'

const formatDate = function (date) {
        var datetime =
                date.getFullYear()
                + "-"// "年"
                + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
                + "-"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
                + " "
                + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
                + ":"
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
                + ":"
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        return datetime;
}

const formatNotTime = function (date) {
        var datetime =
                date.getFullYear()
                + "-"// "年"
                + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
                + "-"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
        return datetime;
}

const formatMonthTime = function (date) {
    var datetime =
        date.getFullYear()
        + "-"// "年"
        + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
    return datetime;
}

const formatTime = function (date) {
        var datetime =
                (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
                + ":"
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
                + ":"
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        return datetime;
}

//格式化时间到分钟
const formatDateM = function (date) {
        if (!date) return "";
        var datetime =
                date.getFullYear()
                + "-"// "年"
                + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
                + "-"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
                + " "
                + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
                + ":"
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
                + ":"
                + "00";
        return datetime;
}


//格式化时间到小时
const formatDateH = function (date) {
        if (!date) return "";
        var datetime =
                date.getFullYear()
                + "-"// "年"
                + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1))
                + "-"// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
                + " "
                + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
                + ":"
                + "00"
                + ":"
                + "00";
        return datetime;
}


export { formatDate, formatNotTime, formatTime, formatDateM, formatDateH ,formatMonthTime}
