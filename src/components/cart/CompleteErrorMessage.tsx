export const CompleteErrorMessage = ({ message }: { message: string }) => (
  <div className="flex-center mt-25 flex-col">
    <h1 className="text-black-200 text-bold-text-40 mb-4">결제 완료</h1>
    <p className={message.includes('오류') ? 'text-red-500' : 'text-gray-600'}>
      {message}
    </p>
  </div>
)
