/**
 * File to bind routes with their handler functions for the Showroom module.
 */

const express = require('express');
const showroomRouter = express.Router();
const showroomHandler = require('../Handlers/ShowroomHandlers.js');
const auth = require('../Handlers/AuthHandlers.js');
const { logError, log } = require('../Utility/Logger.js');

let logCtx = {
    fileName: 'ShowroomEndpoints',
    fn: ''
}

//Routes
var getStats = '/stats';
var getRoomStatus = '/rooms/status';
var getQnARoomInfo = '/qna/info/:projectID';
var announcements = '/announcement'; //used for GET, POST

//Schedule Routes
var getProjects = '/schedule/projects';
var scheduleEvents = '/schedule/events'; //used for GET, POST
var scheduleEventsID = scheduleEvents + '/:eventID'; //used for PUT, DELETE

//Bind routes to their handlers
showroomRouter.get(getStats, auth.authenticate, showroomHandler.getStats); //TODO: implement
showroomRouter.get(getRoomStatus, auth.authenticate, showroomHandler.getRoomStatus); //TODO: implement
showroomRouter.get(getQnARoomInfo, auth.authenticate, showroomHandler.getQnARoomInfo); //TODO: implement
// //showroomRouter.get(announcements, auth.authenticate, showroomHandler.getAnnouncements); //TODO: implement - this might be replaced with event listener on client side
showroomRouter.post(announcements, auth.authorizeAdmin, showroomHandler.postAnnouncements); //TODO: implement

showroomRouter.get(getProjects, auth.authenticate, showroomHandler.getProjects); //TODO - review
showroomRouter.get(scheduleEvents, auth.authenticate, showroomHandler.getScheduleEvents); //TODO - test and review
showroomRouter.post(scheduleEvents, auth.authorizeAdmin, showroomHandler.postScheduleEvents); //TODO - test and review
showroomRouter.put(scheduleEventsID, auth.authorizeAdmin, showroomHandler.updateScheduleEvent); //TODO - implement
showroomRouter.delete(scheduleEventsID, auth.authorizeAdmin, showroomHandler.deleteScheduleEvent); //TODO - implement

module.exports = showroomRouter;