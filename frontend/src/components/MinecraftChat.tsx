const messages = [
  { user: 'Player1', message: 'Hello everyone!', timestamp: '12:01' },
  { user: 'Player2', message: 'Welcome to the server!', timestamp: '12:02' },
  { user: 'Player3', message: 'Let’s build something!', timestamp: '12:03' },
  { user: '', message: '4 out of 352 players are sleeping ...zzzZZZ', timestamp: '12:03' },
];

export const MinecraftChat = () => {
  return (
    <div className="bg-black p-4 shadow-lg  overflow-y-auto font-minecraft absolute bottom-10 left-10 bg-opacity-50 z-40">
      {messages.map((msg, index) => (
        <div key={index} className="mb-1">
          <span className="text-green-400">{msg.user}: </span>
          <span className="text-white">{msg.message}</span>
          <span className="text-gray-500 text-sm ml-2">{msg.timestamp}</span>
        </div>
      ))}
    </div>
  );
};