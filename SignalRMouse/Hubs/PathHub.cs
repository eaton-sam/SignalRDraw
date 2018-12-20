using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Paper;

namespace Paper
{
    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }
        public double Length { get; set; }
        public double Angle { get; set; }
        public double AngleInRadians { get; set; }
    }
}

namespace SignalRMouse.Hubs
{
    public interface PathHubFunctions
    {
        Task ReceivePathStart(string guid, Point point, string colour);
        Task ReceivePathMiddle(string guid, Point point);
        Task ReceivePathEnd(string guid, Point point);
    }

    public class PathHub : Hub<PathHubFunctions>
    {
        public Task SendPathStart(string guid, Point point, string colour)
        {
            return Clients.Others.ReceivePathStart(guid, point, colour);
        }
        public Task SendPathMiddle(string guid, Point point)
        {
            return Clients.Others.ReceivePathMiddle(guid, point);
        }
        public Task SendPathEnd(string guid, Point point)
        {
            return Clients.Others.ReceivePathEnd(guid, point);
        }
    }
}
