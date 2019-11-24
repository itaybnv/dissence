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

        public Channel()
        {
            videoQueue = new BindingList<string>();
            userList = new List<User>();

            videoQueue.AddingNew += (sender, e) =>
            {
                // Broadcast file to all users
            };
        }
    }
}
