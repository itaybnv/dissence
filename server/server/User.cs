using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class User
    {
        public string Nickname { get; set; }
        public Socket socket { get; }
        public Channel currentChannel { get; set; }

        public User(Socket socket, Channel currentChannel)
        {
            this.socket = socket;
            this.currentChannel = currentChannel;
            this.Nickname = "User#" + Guid.NewGuid().ToString().Substring(0, 8);
        }


    }
}
