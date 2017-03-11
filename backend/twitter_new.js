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

function formatTime(created_at){
	var date = new Date(created_at);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return [year,month,day].join("-");
}

var retweet = function(){
	var params = {
		q: '#BuildWall',
		result_type: 'mixed',
		lang: 'en',
		count: 1000
	};

	function fetchOneBatchPromise(params){
		return Twitter.get('search/tweets', params).then(function(response){
			return response.data.statuses;
		});
	}

	var id = 1;
	function fetchNextBatchPromise(prevTextArray, since_id){
		id--;
		if(since_id){
			params.since_id = since_id
		}
		return fetchOneBatchPromise(params).then(function (statuses) {
			console.log("fetch one batch");
			var since_id = _.last(statuses).id - 1;
			var currentTextArray = prevTextArray.concat(statuses);
			statuses.forEach(function(status){
				var textToWrite = status.created_at + " ,"+ status.id;
				//var textToWrite = JSON.stringify(status);
				fs.writeFile('./data.txt', textToWrite+"\n", {flag: 'a'}, function(err){

				})
			})
			if(id == 0){
				return currentTextArray;
			}else{
				return fetchNextBatchPromise(currentTextArray, since_id)
			}
		})
	}

	//var batch = 1;
	function fetchOneBatchByMaxId(max_id){
		console.log("fetch one batch");
		params.max_id = max_id;
		Twitter.get('search/tweets', params).then(function(response){
			var min = getMinIdStatusFromStatuses(response.data.statuses);
			console.log(response.data)
			if(min && min.id){
				console.log(min.id, min.created_at);
				response.data.statuses.forEach(function(status){
					//var textToWrite = status.created_at + " ,"+ status.id;
					var textToWrite = JSON.stringify(status);
					fs.writeFile('./data.txt', textToWrite+"\n", {flag: 'a'}, function(err){

					})
				});
				fetchOneBatchByMaxId(min.id)
			}else{
				console.log("fetch done")
			}
		}).catch(function(err){
			console.log(err)
			console.log("there is error");
		})
	}

	function getMinIdStatusFromStatuses(statuses){
		var min = _.min(statuses, function (status) {
			return status.id;
		});
		return min;
	}
	fetchOneBatchByMaxId(935612853435289600);
};

retweet();