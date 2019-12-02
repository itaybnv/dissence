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

        public User(Socket socket)
        {
            this.socket = socket;
            this.Nickname = "User#" + Guid.NewGuid().ToString().Substring(0, 8);
        }


    }
}
