using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;


namespace server
{
    class SearchHandler
    {
        private YouTubeService youtubeService;

        public SearchHandler()
        {
            // Create a connection with youtube service
            youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = "AIzaSyDSS76wLt0XodIC9SGx9gxH5EOhzUe5dII",
                ApplicationName = this.GetType().ToString()
            });
        }

        public List<Video> ByTitle(string title, int resultAmount)
        {
            List<Video> resultList = new List<Video>();

            // Create a new request for the search query
            var searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.Q = title;
            searchListRequest.MaxResults = resultAmount;
            // Limit the results to video only
            searchListRequest.Type = "video";
            // Execute search request
            var searchListResponse = searchListRequest.Execute();

            // Make another request to the api to get the content details
            // and from there extract the video duration
            var videosListRequest = youtubeService.Videos.List("contentDetails");
            // String all the video ids
            foreach (var searchResult in searchListResponse.Items)
            {
                videosListRequest.Id += searchResult.Id.VideoId + ",";
            }
            // Remove the last comma
            videosListRequest.Id = videosListRequest.Id.Remove(videosListRequest.Id.Length - 1);
            // Execute request
            var videosListResponse = videosListRequest.Execute();

            // Instantiate a video object for each search result and add
            // it to the result list
            for (int i = 0; i < searchListResponse.Items.Count; i++)
            {
                var searchResult = searchListResponse.Items[i];
                var videoResult = videosListResponse.Items[i];
                if (searchResult.Id.Kind == "youtube#video")
                {
                    Video vid = new Video(searchResult.Snippet.Title,
                                             searchResult.Snippet.ChannelTitle,
                                             searchResult.Id.VideoId,
                                             searchResult.Snippet.Thumbnails.Medium.Url,
                                             videoResult.ContentDetails.Duration);
                    resultList.Add(vid);
                    Server.channel.searchHistory[vid.Id] = vid;
                }
            }
            return resultList;
        }
    }
}
