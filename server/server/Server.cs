using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Server
    {
        static void Main(string[] args)
        {
            DownloadHandler test = new DownloadHandler();
            SearchHandler test2 = new SearchHandler();

            test.ByVideo(test2.ByTitle("disguised toast", 5)[0]);
        }
    }
}
