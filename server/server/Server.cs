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
        public static List<Channel> channels { get; set; }
        public static AudioServer AudioServer { get; set; }

        /// <summary>
        /// Main function.
        /// </summary>
        /// <param name="args">Command line arguments.</param>
        static void Main(string[] args)
        {
            // Create the default public channel
            channel = new Channel("public");
            channels = new List<Channel>();
            channels.Add(channel);

            AudioServer = new AudioServer();
            Execute();
        }
        
        /// <summary>
        /// Gets the file name and line in the file of the place it was called from.
        /// Used for error logging.
        /// </summary>
        /// <param name="file">The file that the error occured at.</param>
        /// <param name="lineNumber">The number of the line in the file.</param>
        /// <returns>String with file and line of the error.</returns>
        public static string GetLineAndFile([CallerLineNumber] int lineNumber = 0, [CallerFilePath] string file = null)
        {
            return (file + " at line " + lineNumber);
        }

        /// <summary>
        /// Initiate the server proccess, start a listening loop
        /// and open a thread for each connecting client.
        /// </summary>
        public static void Execute()
        {
            // Establish the local endpoint for the socket. Dns.GetHostName
            // returns the name of the host running the application
            IPAddress ipAddr = IPAddress.Any;
            const int port = 27015;
            IPEndPoint localEndPoint = new IPEndPoint(ipAddr, port);

            // Creation TCP/IP Socket using
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
                    User user = new User(clientSocket, channels.Where(channel => channel.channelName == "public").First());
                    channel.userList.Add(user);

                    // Open a new thread for the user
                    new Thread(() => ClientHandler(user)).Start();

                }
            }

            catch (Exception e)
            {
                Console.WriteLine(GetLineAndFile() + ": " + e.ToString());
            }
        }

        /// <summary>
        /// Runs on a seperate thread and handles client communication.
        /// </summary>
        /// <param name="user">The user this thread handles.</param>
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
                    channel.userList.Remove(user);
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
                if (responsePacket != null)
                {
                    try
                    {
                        user.socket.Send(PacketEncoding.EncodeResponsePacket(responsePacket));
                    }
                    catch (SocketException e)
                    {
                        user.socket.Close();
                        channel.userList.Remove(user);
                        Console.WriteLine(GetLineAndFile() + ": " + e.Message);
                    }
                }


            }


        }
    }
}
