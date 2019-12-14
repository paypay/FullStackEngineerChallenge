const $ = require('../util/System');
const PerformanceReview = require('../models/performance_review');
const { sequelize, Sequelize } = require('../config/database');

const addReview = async (req, res) => {
    let { candidate, points, comments } = req.body;
    let { decoded } = req;
    //TODO: request validation body
    let createReview = null;
    let isPresent;
    try {
        isPresent = await PerformanceReview(sequelize, Sequelize).findOne({
            where: {
                candidate,
                reviewer: decoded['_id']
            }
        });
    } catch (e) {
        return res.send($.formatException('Failed to query'));
    }
    if (isPresent) {
        return res.send($.formatException('A review is already present in the system.'));
    }
    try {
        createReview = await PerformanceReview(sequelize, Sequelize).create({
            candidate,
            reviewer: decoded['_id'],
            points,
            comments,
            created_by: decoded['_id'],
            created_datetime: new Date(),
            last_updated_by: null,
            last_updated_datetime: null,
        });
    } catch (e) {
        console.error(e);
        return res.send($.formatException('Error creating new record'));
    }
    return res.send($.formatException('Successfully saved review'))
};


const viewPerformanceReview = async (req, res) => {
    let {userid} = req.body;
    let hasRecords;
    try{
        hasRecords = await PerformanceReview(sequelize, Sequelize.DataTypes).findAll({ where: {candidate: userid}});
    } catch (e){
        return res.send($.formatException('Failed to fetch data.'));
    }
    return res.send($.formatException('OK', { data: hasRecords }));
}

module.exports = {
    createReview: addReview,
    viewPerformanceReview,
};