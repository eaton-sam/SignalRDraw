using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public interface HubFunctions
{
    Task ReceiveMouseLoc(string name, int x, int y);
}

public class MouseHub : Hub<HubFunctions>
{
    public Task SendMouseLoc(int x, int y)
    {
        return Clients.Others.ReceiveMouseLoc(Context.ConnectionId, x, y);
    }
}