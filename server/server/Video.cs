using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Video
    {
        public string Title { get; }
        public string ChannelTitle { get; }
        public string Id { get; }
        public string ThumbnailUrl { get; }
        public string VideoLength { get; }

        /// <summary>
        /// Constructs a video object
        /// </summary>
        /// <param name="title">The title of the video</param>
        /// <param name="channelTitle">The name of the channel that posted the video</param>
        /// <param name="id">The video id from the youtube api</param>
        /// <param name="thumbnailUrl">The URL of the thumbnail of the video</param>
        /// <param name="videoLength">The video duration in ISO 8601 format</param>
        public Video(string title, string channelTitle, string id, string thumbnailUrl, string videoLength)
        {
            this.Title = title;
            this.ChannelTitle = channelTitle;
            this.Id = id;
            this.ThumbnailUrl = thumbnailUrl;
            this.VideoLength = videoLength;
        }
    }
}
