using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Channel
    {
        public List<Video> videoQueue { get; }
        public List<User>  userList { get;  }

        public Channel()
        {
            videoQueue = new List<Video>();
            userList = new List<User>();
        }
    }
}
