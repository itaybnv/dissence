using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using server.packets;

namespace server
{
    class Server
    {
        public static Channel channel;

        static void Main(string[] args)
        {
            channel = new Channel();
            Execute();
            //new DownloadByIdPacket(new Dictionary<string, object>() { { "videoId", "oGlLiEhDaIY" } }).Execute(new User(new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)));
        }

        private static string GetLineAndFile([CallerLineNumber] int lineNumber = 0, [CallerFilePath] string file = null)
        {
            return (file + " at line " + lineNumber);
        }

        public static void Execute()
        {
            // Establish the local endpoint for the socket. Dns.GetHostName 
            // returns the name of the host running the application 
            IPHostEntry ipHost = Dns.GetHostEntry(Dns.GetHostName());
            //IPAddress ipAddr = ipHost.AddressList[0];
            IPAddress ipAddr = IPAddress.Parse("127.0.0.1");
            const int port = 27015;
            Console.WriteLine(ipAddr.MapToIPv4());
            IPEndPoint localEndPoint = new IPEndPoint(ipAddr, port);

            // Creation TCP/IP Socket using  
            // Socket Class Costructor 
            Socket listener = new Socket(ipAddr.AddressFamily,
                         SocketType.Stream, ProtocolType.Tcp);

            try
            {

                // Using Bind() method we associate a network address to the server socket
                // All client that will connect to this Server Socket
                // must know this network Address
                listener.Bind(localEndPoint);

                // Using Listen() method we create the Client list that will want 
                // to connect to Server 
                listener.Listen(10);

                while (true)
                {

                    Console.WriteLine("Waiting connection ... ");

                    // Suspend while waiting for incoming connection Using
                    // Accept() method the server will accept connection of client 
                    Socket clientSocket = listener.Accept();

                    // Create user and add to channel list
                    User user = new User(clientSocket);

                    // Open a new thread for the user
                    new Thread(() => ClientHandler(user)).Start();

                }
            }

            catch (Exception e)
            {
                Console.WriteLine(GetLineAndFile() + ": " + e.ToString());
            }
        }

        public static void ClientHandler(User user)
        {
            // Contains the ip, port and other info about the client socket
            IPEndPoint remoteIpEndPoint;

            // Data packet
            byte[] packetBuffer;
            // Packet header byte array
            byte[] packetHeaderBuffer = new byte[5];
            // Length of the next packet
            byte[] packetLengthBuffer = new byte[4];

            // Length of the next packet (int)
            int packetLen;
            // Type of packet
            int packetType;

            // Packet stored in correct object
            Packet packet;
            ResponsePacket responsePacket;

            remoteIpEndPoint = user.socket.RemoteEndPoint as IPEndPoint;

            Console.WriteLine($"Connection from {remoteIpEndPoint.Address.MapToIPv4()}:{remoteIpEndPoint.Port}");

            while (user.socket.Connected)
            {
                try
                {
                    // If the byte count of the length packet is not 5, ignore this packet
                    if (user.socket.Receive(packetHeaderBuffer) != 5)
                        continue;
                }
                catch (SocketException e)
                {
                    user.socket.Close();
                    Console.WriteLine(GetLineAndFile() + ": " + e.Message);
                    continue;
                }



                // If the system architecture is little-endian ( little end first in array )
                // reverse the byte array.
                if (BitConverter.IsLittleEndian)
                    Array.Reverse(packetHeaderBuffer, 0, 4);

                // Get packet len from first 4 bytes of packet header buffer
                packetLen = BitConverter.ToInt32(packetHeaderBuffer, 0);

                // Get packet type from the last byte of the array
                packetType = packetHeaderBuffer[4];

                // Initiate packet byte array with correct size
                packetBuffer = new byte[packetLen];

                // Receive data packet
                user.socket.Receive(packetBuffer);

                packet = PacketEncoding.DecodePacket(packetBuffer, packetType);

                responsePacket = packet.Execute(user);

                try
                {
                    user.socket.Send(PacketEncoding.EncodeResponsePacket(responsePacket));
                }
                catch (SocketException e)
                {
                    user.socket.Close();
                    Console.WriteLine(GetLineAndFile() + ": " + e.Message);
                }


            }


        }
    }
}
