using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Channel
    {
        public BindingList<string> videoQueue { get; }
        public List<User> userList { get;  }
        public Dictionary<string, Video> searchHistory;

        public Channel()
        {
            videoQueue = new BindingList<string>();
            userList = new List<User>();
            searchHistory = new Dictionary<string, Video>();

            videoQueue.AddingNew += (sender, e) =>
            {
                // Send new video details to all clients
                // Send the actual video file to all clients
            };
        }
    }
}
