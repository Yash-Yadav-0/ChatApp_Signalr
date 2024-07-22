﻿using Microsoft.AspNetCore.SignalR;
using MyChatWeb.Api.DataService;
using MyChatWeb.Api.Models;

namespace MyChatWeb.Api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _sharedDb;

        public ChatHub(SharedDb sharedDb) => _sharedDb = sharedDb;

        public async Task JoinChat(UserConnection connection)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{connection.UserName} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            _sharedDb.connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("JoinSpecificChatRoom", "admin", $"{connection.UserName} has joined {connection.ChatRoom}");
        }

        public async Task SendMessage(string msg)
        {
            if (_sharedDb.connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            {
                await Clients.Group(connection.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", connection.UserName, msg);
            }
        }
    }
}
