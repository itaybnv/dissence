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

        /// <summary>
        /// Constructs a user object
        /// </summary>
        /// <param name="socket">The socket of the user</param>
        /// <param name="currentChannel">The channel the user is in</param>
        public User(Socket socket, Channel currentChannel)
        {
            this.socket = socket;
            this.currentChannel = currentChannel;
            this.Nickname = "User#" + Guid.NewGuid().ToString().Substring(0, 8);
        }


    }
}
