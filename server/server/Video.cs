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
