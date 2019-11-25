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

            videoQueue.ListChanged += (sender, e) =>
            {
                if (e.ListChangedType == ListChangedType.ItemAdded)
                {
                    // Send new video details to all clients
                    Console.WriteLine("Item added to playlist");
                    // create and broadcast response packet
                    
                    // Send the actual video file to all clients
                }
            };
        }
    }
}
