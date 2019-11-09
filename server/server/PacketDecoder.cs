using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class PacketDecoder
    {
        // Map dictionary that maps packet types to their packet object
        private static readonly Dictionary<PacketType, Type> packetTypes = new Dictionary<PacketType, Type> {
            { PacketType.getConnectedUsers, typeof(GetConnectedUsersPacket) }
        };

        public static Packet DecodePacket(byte[] packet, int packetType)
        {
            Dictionary<string, string> dataDict;
            Packet readyPacket;
            string packetDataJson;
            object[] parameters;
            Type type;

            // Convert byte array to string
            // The packet is sent as a string of a Json object
            packetDataJson = Encoding.UTF8.GetString(packet, 0, packet.Length);

            // Convert from Json string to dict for ease of use
            dataDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(packetDataJson);

            // Get the type of packet needed to instantiate
            type = packetTypes[(PacketType)packetType];

            // Set the parameters of the packet object
            parameters = new object[1] { dataDict };

            // Create an object of type packetType, and pass the tye 
            readyPacket = (Packet)Activator.CreateInstance(type, parameters);

            return readyPacket;
        }
    }
}
