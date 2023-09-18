import dayjs from "dayjs";
export default {
    /*
        接口传参数需要
        按时间查询记录时，要求只能查最近一个月的时间范围
        需要限制日期最大最小值
    */
    getDateRange() {
        const now = dayjs();
        return {
            minDate1: now.subtract(1, "month").toDate(),
            maxDate1: now.subtract(1, "day").toDate(),
        };
    },
    /*
        接口传参数需要
        按月份查询时，后端要求2022-02后拼接成
        开始日期：2022-02-01 00:00:00
        结束日期：2022-02-?? 23:59:59
        需要计算月份最后日期
    */
    monthlyRange(time) {
        let ym = time.format("YYYY-MM");
        const date = dayjs(ym); // 参数：2022-02
        let lastDay = date.endOf("month").date();
        return {
            start: ym + "-01 00:00:00",
            end: ym + "-" + lastDay + " 23:59:59",
        };
    },
};
