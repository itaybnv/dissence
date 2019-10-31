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

            // Instantiate a video object for each search result and add
            // it to the result list
            foreach (var searchResult in searchListResponse.Items)
            {
                if(searchResult.Id.Kind == "youtube#video")
                {
                    resultList.Add(new Video(searchResult.Snippet.Title,
                                             searchResult.Snippet.ChannelTitle,
                                             searchResult.Id.VideoId,
                                             searchResult.Snippet.Thumbnails.Default__.Url));
                }
            }

            return resultList;
        }
    }
}
