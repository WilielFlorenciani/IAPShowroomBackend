/**
 * Test file for BBB operations.
 */

 const testData = require('./TestData.js');
 const streaming = require('../Handlers/VideoStreamingHandlers.js');
 const { logError, logDebug, logTest } = require('../Utility/Logger.js');
 const { XMLParser } = require('fast-xml-parser');
const { response } = require('express');
const { array } = require('joi');
const { user } = require('pg/lib/defaults');

 const parser = new XMLParser({ ignoreAttributes: false });
 
 let logCtx = {
     fileName: 'BBBTesting',
     fs: ''
 }
 
 
 //run test:

//  testChecksum();
testReadXML();
 
 
 //test functions:
 
function testChecksum () {
    logCtx.fn = 'testChecksum';
    logTest("Start test", logCtx);
    var callName = 'create';
    var meetingName = 'RUM Solar 2022';
    var meetingID = '1';
    var moderatorPW = 'testmodpass';
    var queryString = "name=" + meetingName + "&meetingID=" + meetingID + "&moderatorPW=" + moderatorPW;
    var checksum = streaming.generateChecksum(callName, queryString);
    logTest("checksum: " + checksum, logCtx);
    logTest("End test", logCtx);
}

function testReadXML() {
    logCtx.fn = 'testReadXML';
    logTest("Start test", logCtx);
    // var jsonResp = parser.parse(testData.getMeetingInfoXMLSuccessResponse);
    var jsonResp = parser.parse("<response><returncode>SUCCESS</returncode><meetingName>Demo Meeting</meetingName><meetingID>Demo Meeting</meetingID><internalMeetingID>183f0bf3a0982a127bdb8161e0c44eb696b3e75c-1531240585189</internalMeetingID><createTime>1531240585189</createTime><createDate>Tue Jul 10 16:36:25 UTC 2018</createDate><voiceBridge>70066</voiceBridge><dialNumber>613-555-1234</dialNumber><attendeePW>ap</attendeePW><moderatorPW>mp</moderatorPW><running>true</running><duration>0</duration><hasUserJoined>true</hasUserJoined><recording>false</recording><hasBeenForciblyEnded>false</hasBeenForciblyEnded><startTime>1531240585239</startTime><endTime>0</endTime><participantCount>2</participantCount><listenerCount>1</listenerCount><voiceParticipantCount>1</voiceParticipantCount><videoCount>1</videoCount><maxUsers>20</maxUsers><moderatorCount>1</moderatorCount><attendees><attendee><userID>w_2wzzszfaptsp</userID><fullName>stu</fullName><role>VIEWER</role><isPresenter>false</isPresenter><isListeningOnly>true</isListeningOnly><hasJoinedVoice>false</hasJoinedVoice><hasVideo>false</hasVideo><clientType>FLASH</clientType></attendee><attendee><userID>w_eo7lxnx3vwuj</userID><fullName>mod</fullName><role>MODERATOR</role><isPresenter>true</isPresenter><isListeningOnly>false</isListeningOnly><hasJoinedVoice>true</hasJoinedVoice><hasVideo>true</hasVideo><clientType>HTML5</clientType></attendee></attendees><metadata /><isBreakout>false</isBreakout></response>");
    logTest("jsonResp: ", logCtx);
    console.log(jsonResp);
    logTest("attendees: ", logCtx);
    console.log(jsonResp.response.attendees)
    logTest("End test", logCtx);
}