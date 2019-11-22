using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using server.packets;
using Newtonsoft.Json;

namespace server.packets
{
    class GetSearchResultPacket : Packet
    {
        // Used to get the search results
        private SearchHandler searchHandler = new SearchHandler();

        public GetSearchResultPacket(Dictionary<string, object> data) : base(PacketType.getSearchResults, data)
        {

        }

        public override ResponsePacket Execute(User user)
        {
            // Query the user sent
            string query;
            // Result amount requested by the client
            int resultAmount;

            // Response packet
            ResponsePacket response;
            // The response data
            Dictionary<string, object> data;
            // List of video results from the query recieved
            List<Video> results;

            // Get query from data sent by the user
            query = (string)this.data["query"];
            // Get result amount from data sent by the user
            resultAmount = (int)(long)this.data["amount"];

            // Get the search results for the query sent by the user
            results = searchHandler.ByTitle(query, resultAmount);

            // Build the data dictionary to send back to the client
            data = new Dictionary<string, object>()
            {
                { "results", results }
            };
            // build the response packet
            response = new ResponsePacket(data, PacketType.getSearchResults);

            return response;

        }
    }
}
