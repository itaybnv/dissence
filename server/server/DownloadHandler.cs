using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NYoutubeDL;

namespace server
{
    class DownloadHandler
    {
        private YoutubeDL ytdl;
        public DownloadHandler()
        {
            ytdl = new YoutubeDL();
        }

        public void ByVideo(Video video)
        {
            // Download audio only
            ytdl.Options.PostProcessingOptions.ExtractAudio = true;
            ytdl.Options.FilesystemOptions.Output = $"../../audio_files/{video.Title}.mp3"; // TODO: fix the download location
            ytdl.VideoUrl = $"https://www.youtube.com/watch?v={video.Id}";

            // Subscribe to console output
            ytdl.StandardOutputEvent += (sender, output) => Console.WriteLine(output);
            ytdl.StandardErrorEvent += (sender, errorOutput) => Console.WriteLine(errorOutput);

            // Execute download
            ytdl.Download();
        }
    }
}
