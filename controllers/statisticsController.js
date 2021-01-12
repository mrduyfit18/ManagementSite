const statisticsServices = require('../models/statisticsServices');


exports.index = async (req, res, next) => {
    const result = await statisticsServices.getTopProducts();
    res.render('statistics/index', {topProducts: result});
}

exports.getStatistic = async (req, res, next) => {

    const option = parseInt(req.query.option);
    let date = req.query.date;
    const dateArr = date.split('/');
    date = dateArr[1] + '/' + dateArr[0]+ '/' + dateArr[2];
    const curr = new Date(date);
    curr.setDate(curr.getDate()+1);
    curr.setUTCHours(0,0,0);
    let result;
    let firstDate, lastDate;

    switch (option) {
        case 1:
            result = await statisticsServices.getStatisticByDay(date);
            return res.render('statistics/statistic', {layout: false, Products: result});

        case 2:
            const day = curr.getDay();
            lastDate = new Date(curr);
            firstDate = new Date(curr.setDate(curr.getDate() - day + (day===0? -6: 1)));
            lastDate.setDate(firstDate.getDate() + 7);
            result = await statisticsServices.getStatisticByTime(firstDate, lastDate);
            lastDate.setDate(lastDate.getDate() -1);
            return res.render('statistics/statistic', {layout: false, Products: result, firstDate, lastDate});

        case 3: {
            const year = curr.getFullYear(), month = curr.getMonth();
            firstDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
            lastDate = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));
            result = await statisticsServices.getStatisticByTime(firstDate, lastDate);
            lastDate.setDate(lastDate.getDate() -1);
            return res.render('statistics/statistic', {layout: false, Products: result, firstDate, lastDate});
        }

        case 4: {
            const year = curr.getFullYear();
            let month = curr.getMonth();
            const mod = (month + 1) % 3;
            const beginMonth = month - ((mod === 0) ? 2: (mod === 2 ? 1 : 0));
            firstDate = new Date(Date.UTC(year, beginMonth, 1, 0, 0, 0));
            lastDate = new Date(Date.UTC(year, beginMonth + 3, 1, 0, 0, 0));
            result = await statisticsServices.getStatisticByTime(firstDate, lastDate);
            lastDate.setDate(lastDate.getDate() -1);
            return res.render('statistics/statistic', {layout: false, Products: result, firstDate, lastDate});
        }

        case 5:
            const year = curr.getFullYear();
            firstDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
            lastDate = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0));
            result = await statisticsServices.getStatisticByTime(firstDate, lastDate);
            lastDate.setDate(lastDate.getDate() -1);
            return res.render('statistics/statistic', {layout: false, Products: result, firstDate, lastDate});
    }

    next();
}