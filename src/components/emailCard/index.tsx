function EmailCard({ email, setSelected }) {
    return (
      <div
        className="bg-white p-4 cursor-pointer hover:bg-gray-100"
        onClick={() => setSelected(email.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold">{email.from}</h3>
          <span className="text-gray-500">{email.time}</span>
        </div>
        <h2 className="font-bold mb-2">{email.subject}</h2>
        <p className="text-gray-500">{email.body}</p>
      </div>
    );
}

export default EmailCard;