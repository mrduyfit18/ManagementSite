const statisticsServices = require('../models/statisticsServices');


exports.index = async (req, res, next) => {
    const result = await statisticsServices.getTopProducts();
    res.render('statistics/index', {topProducts: result});
}

exports.getStatistic = async (req, res, next) => {

    const option = parseInt(req.query.option);
    const date = req.query.date;
    let result;
    switch (option) {
        case 1:
            result = await statisticsServices.getStatisticByDay(date);
            console.log(result);
            return res.render('statistics/statistic', {layout: false, Products: result});

        case 2:
            result =statisticsServices.getStatisticByWeek(date);
            return res.render();

        case 3:
            result =statisticsServices.getStatisticByMonth(date);
            return res.render();

        case 4:
            result =statisticsServices.getStatisticByQuarter(date);
            return res.render();

        case 5:
            result =statisticsServices.getStatisticByYear(date);
            return res.render();
    }

    res.render('statistics/index', {topProducts: result});
}