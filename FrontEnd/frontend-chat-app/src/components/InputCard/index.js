const InputCard = ({title, buttonText, onSubmit, children}) => {
  return (
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
          >
            {buttonText}
          </button>
        </form>
      </div>
  )
}

export default InputCard
