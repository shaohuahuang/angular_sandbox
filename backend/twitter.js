var config = {
	consumer_key: 'xOl367PpUWfiwbZJirRTt4wjV',
	consumer_secret: '9J7MM2FiqAWVQ5wmjPhyU81BT1anzQEIhdg6EfIItcV49uvLnV',
	access_token: '535519789-Q4HigpNCfQfeBSlXvtXOPoCDn1UpvRLsif4c35Qi',
	access_token_secret:'IPlucbEU3jiH5eeJTmXd280hu9mNYku5ZcE3HpIAs9gzI'
};

var twit = require('twit-promise');
var Twitter = new twit(config);
var fs = require('fs');
var _ = require('underscore');
var Promise = require('bluebird');
var request = require('request-promise');
var END_POINT = 'http://api.datumbox.com:80/1.0/TwitterSentimentAnalysis.json';
var API_KEY = '28855d35f0c79a526e3da802499ce6ed';

function formatTime(created_at){
	var date = new Date(created_at);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return [year,month,day].join("-");
}

var retweet = function(){
	var params = {
		q: '#BuildTheWall',
		result_type: 'mixed',
		lang: 'en',
		count: 10
	};

	function fetchOneBatchPromise(params){
		return Twitter.get('search/tweets', params).then(function(response){
			return response.data.statuses;
		});
	}

	var id = 2;
	function fetchNextBatchPromise(prevTextArray, since_id){
		id--;
		if(since_id){
			params.since_id = since_id
		}
		return fetchOneBatchPromise(params).then(function (statuses) {
			console.log("fetch one batch");
			var since_id = _.last(statuses).id - 1;
			var thisArr = statuses.map(function (status) {
				return [status.text, formatTime(status.created_at), status.id];
			});
			//var currentTextArray = prevTextArray.concat(thisArr);
			var currentTextArray = prevTextArray.concat(statuses);
			statuses.forEach(function(status){
				fs.writeFile('./data.txt', JSON.stringify(status)+"\n", {flag: 'a'}, function(err){

				})
			})
			if(id == 0){
				return currentTextArray;
			}else{
				return fetchNextBatchPromise(currentTextArray, since_id)
			}
		})
	}

	function getSinceIdForPeriod(startDate, endDate){

	}



	//change here
	fetchNextBatchPromise([]).then(function(data){
		//console.log(data);
		var positiveCount = 0;
		var negativeCount = 0;
		var neturalCount = 0;
		//console.log(data.length);
		//Promise.map(data, function(entry){
		//	var options = {
		//		method: 'POST',
		//		uri: END_POINT,
		//		form: {
		//			api_key: API_KEY,
		//			text: entry[0]
		//		},
		//		json: true
		//	};
		//	return request(options).then(function(data){
		//		//data = JSON.parse(data);
		//		console.log(data.output);
		//		if(data.output.result == "positive"){
		//			positiveCount++;
		//		}else if(data.output.result == "neutral"){
		//			neturalCount++;
		//		}else{
		//			negativeCount++;
		//		}
		//		return entry.concat([data.output.result]);
		//	}).catch(function(err){
		//		console.log(entry, "failed");
		//	})
		//}, {concurrency: 20}).then(function(data){
		//	console.log(positiveCount, neturalCount, negativeCount, data.length);
		//	//fs.writeFile('./data.txt', data.join('\n\n\n'), {flag: 'a'}, function(err){
		//	//
		//	//})
		//}).catch(function(err){
		//	console.log(err);
		//})

		//fs.writeFile('./data.txt', data.join('\n\n\n=======================================\n\n'), {flag: 'a'}, function(err){
		//
		//})
	});
};

retweet();